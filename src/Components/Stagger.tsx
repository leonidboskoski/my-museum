import React from "react";
import { motion } from "framer-motion";

const Stagger = () => {
  return (
    <div className=" grid h-screen place-content-center gap-2 bg-green-300 text-black">
      <FlipLink>Twitter</FlipLink>
    </div>
  );
};

export default Stagger;

const FlipLink = ({ children }: { children: string }) => {

    const DURATION = 0.25
    const STAGGER = 0.025
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase bg-white"
    >
      <div>
        {children.split("").map((char, index) => {
          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * index
              }}
              key={index}
              className="inline-block"
            >
              {char}
            </motion.span>
          );
        })}
      </div>

      <div className="absolute">
        {children.split("").map((char, index) => {
          return (
            <motion.span
              variants={{
                initial: { y: 0},
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * index
              }}
              key={index}
              className="inline-block"
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    </motion.a>
  );
};
