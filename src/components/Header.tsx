import { Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const subtitle = "Explore the fascinating world of sound and acoustics";

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container text-center mx-auto mt-8 mb-4 px-4 sm:mt-12 sm:mb-6"
    >
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        <motion.div
          whileHover={{ 
            scale: 1.2, 
            rotate: [0, -10, 10, -10, 0],
            transition: {
              rotate: { duration: 0.5, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 400, damping: 10 }
            }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Music className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400 animate-pulse" />
        </motion.div>

        <motion.h1 
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 
                     dark:from-blue-300 dark:via-purple-400 dark:to-blue-500 
                     bg-clip-text text-transparent bg-300% animate-gradient"
          whileHover={{ 
            scale: 1.05,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10
            }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Sound Pursuit
        </motion.h1>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-blue-600/90 dark:text-blue-400/90 text-sm sm:text-base font-light"
      >
        {subtitle.split(" ").map((word, wordIndex) => (
          <motion.span 
            key={wordIndex} 
            className="mr-[0.3em] inline-block"
            whileHover={{ 
              scale: 1.1,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
          >
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block animate-letter-wave"
                style={{
                  animationDelay: `${(wordIndex * 5 + charIndex) * 0.1}s`
                }}
              >
                {char}
              </span>
            ))}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}