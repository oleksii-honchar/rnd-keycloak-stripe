import React, { useState, useEffect } from "react";

export function ScrollDownIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    const maxHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const currScrollOffset = window.innerHeight + window.scrollY;
    const currDiffWithMaxHeight = maxHeight - currScrollOffset;
    if (currDiffWithMaxHeight <= window.innerHeight / 3) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-down-indicator">
      {isVisible && (
        <div className="fixed bottom-2 left-2/4 text-2xl text-md3-sys-light-primary animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
