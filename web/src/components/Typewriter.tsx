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
    
    // 生成老式打字机的清脆、带有一点低频共鸣的"咔哒"声
    osc.type = "triangle";
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); // 音量大一点
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05); // 稍微长一点点的衰减
    
    // 增加一点高频杂音，让声音显得更机械、生硬
    const osc2 = audioCtx.createOscillator();
    const gainNode2 = audioCtx.createGain();
    osc2.type = "square";
    osc2.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.02);
    gainNode2.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
    
    osc.connect(gainNode);
    osc2.connect(gainNode2);
    gainNode.connect(audioCtx.destination);
    gainNode2.connect(audioCtx.destination);
    
    osc.start();
    osc2.start();
    osc.stop(audioCtx.currentTime + 0.05);
    osc2.stop(audioCtx.currentTime + 0.02);
  } catch (e) {
    // 忽略由于未交互导致的浏览器拦截错误
  }
};

export default function Typewriter({
  words,
  typingSpeed = 350,  // 调慢打字速度 (原为200)
  deletingSpeed = 150, // 调慢删字速度 (原为100)
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
