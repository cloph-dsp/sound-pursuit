import React from 'react';
import { Music } from 'lucide-react';

export default function Header() {
  const subtitle = "Explore the fascinating world of sound and acoustics";

  return (
    <div className="w-full max-w-4xl text-center mx-auto mb-8 px-4 sm:mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
        <Music className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 animate-pulse" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent animate-wave">
          Sound Pursuit
        </h1>
      </div>
      <p className="text-blue-600/80 text-base sm:text-lg font-light break-words whitespace-normal leading-relaxed">
        {subtitle.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="mr-[0.3em] inline-block">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block animate-letter-wave"
                style={{
                  animationDelay: `${(wordIndex * 5 + charIndex) * 0.1}s`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </p>
    </div>
  );
}
