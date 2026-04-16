"use client";

import { useState, useEffect } from "react";

// 初始化一个单例的 AudioContext 用于生成打字音效
let audioCtx: AudioContext | null = null;

const playTypeSound = () => {
  try {
    if (typeof window === "undefined") return; // 避免服务端渲染报错
    
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    
    if (!audioCtx) return;

    // 浏览器要求用户交互后才能发声，尝试恢复 suspended 状态
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // 生成一个短促的高频"滴答"声，模拟机械键盘敲击
    osc.type = "square";
    osc.frequency.setValueAtTime(350, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.03);
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // 音量
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (e) {
    // 忽略由于未交互导致的浏览器拦截错误
  }
};

export default function Typewriter({
  words,
  typingSpeed = 200,
  deletingSpeed = 100,
  pauseDuration = 3000,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const word = words[currentWordIndex];

    if (isDeleting) {
      if (currentText === "") {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 500); // 停顿0.5秒后开始打下一个词
      } else {
        timer = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length - 1));
          playTypeSound();
        }, deletingSpeed);
      }
    } else {
      if (currentText === word) {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      } else {
        timer = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length + 1));
          playTypeSound();
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center whitespace-nowrap">
      <span>{currentText}</span>
      <span className="inline-block ml-[0.05em] w-[0.08em] h-[0.8em] bg-white opacity-80 animate-[pulse_1s_ease-in-out_infinite]"></span>
    </span>
  );
}
