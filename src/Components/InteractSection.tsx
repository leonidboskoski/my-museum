import { motion, useInView,AnimatePresence } from "framer-motion";
import { useState,useRef} from "react";
import { useNavigate } from "react-router-dom";

const InteractSection = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref,{amount: 0.3,once: true})

  const navigate = useNavigate();

  return (
    <div className="w-screen h-[100vh] bg-white flex items-center justify-center">
      <motion.div 
      variants={{
        hidden: {opacity:0, y: "50%"},
        visible: {opacity:1, y: 0}
      }}
      animate={isInView ? "visible": "hidden"}
      transition={{
        duration:0.5,
        ease: "easeInOut"
      }}
      ref={ref} className="relative bg-black mx-[10%] rounded-3xl h-[80vh] overflow-hidden">
        <motion.img
          initial={{scale: 1}}
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
          whileHover="hovered"
          onMouseEnter={() => {
            return setIsHovered(true);
          }}
          onMouseLeave={() => {
            return setIsHovered(false);
          }}
          className="bg-black w-full h-full absolute inset-0 z-10 rounded-3xl"
        ></motion.div>

        <AnimatePresence>
        {isHovered && (
          <motion.div
          variants={{
            visible:{y:0,opacity: 1},
            hidden:{y:"200%",opacity: 0},
            exit:{y:"200%",opacity: 0,transition:{duration: 0.25}}
          }}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          transition={{
            duration: 0.35,
            ease: "easeInOut"
          }}
          onMouseEnter={() => {
            return setIsHovered(true);
          }}
          onMouseLeave={() => {
            return setIsHovered(false);
          }}
          exit="exit"
          onClick={() => navigate("/experience")}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white  text-6xl font-black z-[99] cursor-pointer">
            Start Interacting!
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InteractSection;
