import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const InteractSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });
  const navigate = useNavigate();

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      setIsHovered(true);
    }, 300); 
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer.current!);
  };

  return (
    <div className="w-screen h-[100vh] bg-white flex items-center justify-center">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: "50%" },
          visible: { opacity: 1, y: 0 },
        }}
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        ref={ref}
        className="relative bg-black mx-[5%] md:mx-[10%] rounded-3xl h-[70vh] md:h-[80vh] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.img
          initial={{ scale: 1 }}
          animate={{
            scale: isHovered ? 1 : isInView ? 1.25 : 1,
          }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
          src="/Thumbnail.JPG"
          alt="Thumbnail.jpg"
          className="object-cover w-full h-full rounded-3xl"
        />

        <motion.div
          variants={{
            hovered: { opacity: 0.3 },
            initial: { opacity: 0.6 },
          }}
          initial="initial"
          animate={isHovered ? "hovered" : "initial"}
          className="bg-black w-full h-full absolute inset-0 z-10 rounded-3xl"
        />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: "200%", opacity: 0 },
                exit: { y: "200%", opacity: 0, transition: { duration: 0.25 } },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => navigate("/experience")}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl md:text-6xl font-black z-[99] cursor-pointer text-center px-4"
            >
              Start Interacting!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InteractSection;
