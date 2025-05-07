import { IoMdClose } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { IoReturnUpBack } from "react-icons/io5";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";

import { Description } from "../assets/types";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import Museum from "./Museum";
import { buttons } from "../assets/buttons";
import EntranceCamera from "./EntranceCamera";
import { AnimationClick } from "../assets/hooks";
import { controlsText } from "../assets/controlsText";

import { useNavigate } from "react-router-dom";

type SceneProps = {
  className?: string;
};

const Scene = ({ className }: SceneProps) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [description, setDescription] = useState<Description | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [controls, toggleControls] = useState(false);

  const cameraRef = useRef<any>(null);

  //Controls Function
  const handleClickArrow = (dir: number) => {
    setDirection(() => dir);
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return controlsText.length - 1;
      if (next >= controlsText.length) return 0;
      return next;
    });
  };

  //Camera Button Function
  const handleButtonClick = ({ name, description }: Description) => {
    setDescription({ name, description });
    setIsClicked(true);
  };

  const { progress, loaded } = useProgress();

  useEffect(() => {
    if (loaded) {
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [loaded]);

  return (
    <div className={`${className} relative`}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
              exit: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="text-white text-2xl font-semibold">
              Loading {Math.floor(progress)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [-0.1, 4, -28.5], fov: 60, near: 0.1, far: 1000 }}
      >
        <Museum />
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <OrbitControls
          ref={cameraRef}
          minDistance={5}
          maxDistance={50}
          target={[-0.2, 5, 23]}
        />
        <EntranceCamera />

        {buttons.map((button, index) => (
          <Html
            className={`${isClicked ? "hidden" : "block"}`}
            sprite
            scale={1.5}
            key={index}
            position={button.position}
          >
            <div
              onMouseEnter={() => setHovered(button.name)}
              onMouseLeave={() => setHovered(null)}
              onClick={() =>
                AnimationClick(
                  button.cameraPosition,
                  button.cameraLookAt,
                  cameraRef
                )
              }
              className={`cursor-pointer bg-white border border-black rounded-full p-2 ${
                controls ? "hidden" : "block"
              }`}
            ></div>

            <AnimatePresence>
              {hovered === button.name && (
                <motion.div
                  onMouseEnter={() => setHovered(button.name)}
                  onMouseLeave={() => setHovered(null)}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-black/60 px-4 py-2 rounded-md border border-white text-white absolute top-full left-full hover:cursor-pointer"
                  onClick={() => handleButtonClick(button)}
                >
                  <p className="whitespace-nowrap">{button.name}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Html>
        ))}
      </Canvas>

      {/* DESCRIPTION ITEM */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute h-screen top-0 w-screen md:px-32 bg-black/75 text-white border border-black flex flex-col justify-center items-center gap-12"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <IoMdClose
                onClick={() => setIsClicked(false)}
                size={52}
                className="white absolute top-10 right-10 font-bold cursor-pointer"
              />
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-5xl md:text-5xl font-bold text-wrap text-center"
            >
              {description?.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-2xl px-[10%] md:px-[15%] lg:px-[30%] text-center"
            >
              {description?.description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SETTINGS BUTTON */}
      <AnimatePresence mode="wait">
        {isLoaded && !controls && !isClicked && (
          <motion.div
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: "-100%" },
              exit: { opacity: 0, y: "-100%", transition: { duration: 0.35 } },
              hover: { scale: 1.1 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.35,
            }}
            whileHover="hover"
            onClick={() => toggleControls(true)}
            className={`absolute top-0 z-100 bg-white/90 p-1 m-3 rounded-full`}
          >
            <IoMdSettings
              size={50}
              className={`cursor-pointer text-black`}
            ></IoMdSettings>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Menu */}
      <AnimatePresence>
        {isLoaded && controls && (
          <motion.div
            variants={{
              visible: { opacity: 1, transition: { delay: 0.5 } },
              hidden: { opacity: 0 },
              exit: {
                opacity: 0,
                transition: { duration: 0.45, ease: "easeInOut" },
              },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-black/70 w-screen h-screen absolute top-0 z-[999] flex items-center justify-center"
          >
            <div className="bg-white/90 h-[80vh] lg:w-[60vw] md:h-[85vh] rounded-2xl text-black font-bold flex justify-between items-center px-[2%] overflow-hidden relative w-screen mx-[5%] md:mx-[5%] lg:mx-0">
              
              {/* RETURN TO HOME PAGE BTN */}
              <span
              onClick={() => navigate(-1)} 
              className="text-black fixed top-6 left-6 bg-white rounded-full p-1 cursor-pointer">
                <IoReturnUpBack size={40}></IoReturnUpBack>
              </span>

              {/* Left arrow */}
              <motion.span
                className="rounded-full bg-black/80 flex items-center justify-center"
                style={{ padding: "5px" }}
                whileHover={{ padding: "10px" }}
                transition={{ ease: "easeIn", duration: 0.15 }}
                onClick={() => handleClickArrow(-1)}
              >
                <HiOutlineArrowSmLeft
                  size={40}
                  className="cursor-pointer text-white"
                />
              </motion.span>

              {/* Sliding text */}
              <div className="w-full flex justify-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={index}
                    initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                    transition={{
                      duration: 0.45,
                      type: "tween",
                    }}
                    className="text-3xl text-center w-full"
                  >
                    {controlsText[index].text}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right arrow */}
              <motion.span
                className="rounded-full bg-black/80 flex items-center justify-center"
                style={{ padding: "5px" }}
                whileHover={{ padding: "10px" }}
                transition={{ ease: "easeIn", duration: 0.15 }}
                onClick={() => handleClickArrow(1)}
              >
                <HiOutlineArrowSmRight
                  size={40}
                  className="cursor-pointer text-white"
                />
              </motion.span>
            </div>

            <IoMdClose
              size={48}
              className="text-white fixed top-6 right-4 z-[1000] cursor-pointer"
              onClick={() => toggleControls(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scene;
