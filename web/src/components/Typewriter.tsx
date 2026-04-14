"use client";

import { useState, useEffect } from "react";

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
        }, deletingSpeed);
      }
    } else {
      if (currentText === word) {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      } else {
        timer = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length + 1));
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
