import { Music } from 'lucide-react';

export default function Header() {
  const subtitle = "Explore the fascinating world of sound and acoustics";

  return (
    <div className="container text-center mx-auto mt-8 mb-4 px-4 sm:mt-12 sm:mb-6 sm:text-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
        <Music className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 animate-pulse" />
        <h1 className="text-responsive font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent animate-wave text-3xl sm:text-4xl">
          Sound Pursuit
        </h1>
      </div>
      <p className="text-blue-600/80 text-sm sm:text-base font-light break-words whitespace-normal leading-relaxed">
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

