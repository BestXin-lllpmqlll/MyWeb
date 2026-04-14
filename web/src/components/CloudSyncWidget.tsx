"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloudDownload, CloudUpload, Loader2, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3001';

const CloudSyncWidget: React.FC = () => {
  const [pulling, setPulling] = useState(false);
  const [pushing, setPushing] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorModal, setErrorModal] = useState<{title: string, message: string} | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const showMessage = (text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const getChineseErrorMessage = (data: { error?: string; stderr?: string }) => {
    const errorText = ((data.error || '') + ' ' + (data.stderr || '')).toLowerCase();
    
    if (errorText.includes('conflict') || errorText.includes('unmerged files') || errorText.includes('needs merge')) {
      return '当前存在未解决的代码冲突。请先在本地手动解决冲突，并提交更改后再次尝试拉取。';
    }
    if (errorText.includes('resolve host') || errorText.includes('timeout') || errorText.includes('network is unreachable')) {
      return '网络连接失败或超时。请检查您的网络设置，或者检查是否能连接到远程 Git 仓库。';
    }
    if (errorText.includes('permission denied') || errorText.includes('authentication failed')) {
      return 'Git 权限验证失败。请检查您的账号凭证或 SSH 密钥设置是否正确。';
    }
    if (errorText.includes('please commit your changes') || errorText.includes('would be overwritten by merge')) {
      return '您有未提交的本地更改，直接拉取可能会导致代码丢失。请先提交您的更改后再试。';
    }
    
    return `拉取代码时发生未知错误，请打开控制台或终端查看详细日志。\n\n详细信息: ${data.error || '未知异常'}`;
  };

  const fetchWithRetry = async (url: string, options?: RequestInit, retries = 2): Promise<Response> => {
    try {
      return await fetch(`${API_BASE_URL}${url}`, options);
    } catch (err) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw err;
    }
  };

  const executePull = async (shouldReload = true) => {
    setPulling(true);
    showMessage('正在拉取代码...', 'info');
    try {
      const res = await fetchWithRetry('/api/git-pull');
      const data = await res.json();
      if (data.success) {
        showMessage('拉取成功！', 'success');
        if (shouldReload) {
          setTimeout(() => window.location.reload(), 1000);
        }
        return true;
      } else {
        setErrorModal({
          title: '代码拉取失败',
          message: getChineseErrorMessage(data)
        });
        console.error('Git Pull Error:', data);
        return false;
      }
    } catch (err) {
      setErrorModal({
        title: '网络请求失败',
        message: '无法连接到本地服务接口，请检查本地开发服务器是否正常运行。'
      });
      console.error(err);
      return false;
    } finally {
      setPulling(false);
    }
  };

  const handlePull = async () => {
    await executePull(true);
  };

  const executePush = async () => {
    setPushing(true);
    showMessage('正在上传代码...', 'info');
    try {
      const res = await fetchWithRetry('/api/git-push', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showMessage('上传成功！', 'success');
      } else {
        const errorText = ((data.error || '') + ' ' + (data.stderr || '')).toLowerCase();
        let errorMsg = '上传代码时发生未知错误。';
        if (errorText.includes('rejected') || errorText.includes('fetch first')) {
          errorMsg = '云端有新提交，请先拉取最新代码后再试。';
        } else if (errorText.includes('permission denied')) {
          errorMsg = 'Git 权限验证失败。请检查您的账号凭证或 SSH 密钥设置。';
        } else {
          errorMsg += `\n\n详细信息: ${data.error || '未知异常'}`;
        }
        
        setErrorModal({
          title: '代码上传失败',
          message: errorMsg
        });
        console.error('Git Push Error:', data);
      }
    } catch (err) {
      setErrorModal({
        title: '网络请求失败',
        message: '无法连接到本地服务接口，请检查本地开发服务器是否正常运行。'
      });
      console.error(err);
    } finally {
      setPushing(false);
    }
  };

  const checkAndPush = async () => {
    setPushing(true);
    showMessage('正在检查云端状态...', 'info');
    try {
      const res = await fetchWithRetry('/api/git-check');
      const data = await res.json();
      if (data.success && data.isBehind) {
        setShowConfirmModal(true);
        setPushing(false);
        return;
      }
      await executePush();
    } catch (err) {
      setErrorModal({
        title: '网络请求失败',
        message: '无法连接到本地服务接口，请检查本地开发服务器是否正常运行。'
      });
      console.error(err);
      setPushing(false);
    }
  };

  const handleConfirmPullAndPush = async () => {
    setShowConfirmModal(false);
    const pullSuccess = await executePull(false);
    if (pullSuccess) {
      await executePush();
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {message && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 rounded-lg shadow-lg bg-white border flex items-center gap-2 animate-in fade-in slide-in-from-top-5">
          {message.type === 'success' && <div className="w-2 h-2 rounded-full bg-green-500" />}
          {message.type === 'error' && <div className="w-2 h-2 rounded-full bg-red-500" />}
          {message.type === 'info' && <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />}
          <span className="text-gray-800 text-sm font-medium">{message.text}</span>
        </div>
      )}
      
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-[9999]">
      <button
        type="button"
        className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:shadow-xl transition-all border border-blue-100 group relative"
        onClick={handlePull}
        disabled={pulling || pushing}
        title="刷新 (Git Pull)"
      >
        {pulling ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <CloudDownload className="w-6 h-6" />
        )}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
          从云端下载
        </div>
      </button>

      <button
        type="button"
        className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 hover:shadow-xl transition-all border border-blue-700 group relative"
        onClick={checkAndPush}
        disabled={pulling || pushing}
        title="上传 (Git Push)"
      >
        {pushing ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <CloudUpload className="w-6 h-6" />
        )}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
          上传至云端
        </div>
      </button>
    </div>

    {showConfirmModal && (
      <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-2xl shadow-xl w-80 p-6 animate-in zoom-in-95">
          <h3 className="text-lg font-bold text-gray-900 mb-2">发现云端新版本</h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            检测到您的本地代码落后于云端。为了避免代码冲突，建议您先拉取最新代码再进行上传。
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleConfirmPullAndPush}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              拉取并上传
            </button>
          </div>
        </div>
      </div>
    )}

    {errorModal && (
      <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-2xl shadow-xl w-[360px] p-6 animate-in zoom-in-95">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{errorModal.title}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed whitespace-pre-wrap break-words">
            {errorModal.message}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setErrorModal(null)}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors w-full"
            >
              我知道了
            </button>
          </div>
        </div>
      </div>
    )}
    </>,
    document.body
  );
};

export default CloudSyncWidget;
