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

    // 模拟青轴机械键盘的声音 (高频清脆的 click + 短促的 bottom-out clack)
    
    // 1. 高频清脆的段落感点击声 (Click)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = "square"; // 方波更有机械感
    osc1.frequency.setValueAtTime(2500, audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.015);
    gain1.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.015);

    // 2. 键帽触底的反馈声 (Clack)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = "triangle"; // 三角波增加一点浑厚的底音
    osc2.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.03);
    gain2.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

    // 3. 加一点点高频的杂音让声音更脆
    const osc3 = audioCtx.createOscillator();
    const gain3 = audioCtx.createGain();
    osc3.type = "sawtooth";
    osc3.frequency.setValueAtTime(4000, audioCtx.currentTime);
    osc3.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.01);
    gain3.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain3.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.01);

    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);
    gain1.connect(audioCtx.destination);
    gain2.connect(audioCtx.destination);
    gain3.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    osc3.start();
    osc1.stop(audioCtx.currentTime + 0.015);
    osc2.stop(audioCtx.currentTime + 0.03);
    osc3.stop(audioCtx.currentTime + 0.01);
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
