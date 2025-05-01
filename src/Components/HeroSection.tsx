import { CiInstagram } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { useRef, useEffect } from "react";

const socialLinks = [
  {
    name: "Instagram",
    icon: <CiInstagram />,
    href: "https://www.instagram.com",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    href: "https://www.linkedin.com",
  },
  {
    name: "Twitter",
    icon: <FaXTwitter />,
    href: "https://twitter.com",
  },
  {
    name: "YouTube",
    icon: <AiOutlineYoutube />,
    href: "https://www.youtube.com",
  },
];

type HeroSectionProps = {
  setIsSectionVisible: () => void;
};

const HeroSection = ({ setIsSectionVisible }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0%", "end start"],
  });

  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) setIsSectionVisible(true);
    else setIsSectionVisible(false);
  }, [isInView]);

  const width = useTransform(scrollYProgress, [0, 1], ["300px", "1400px"]);
  const height = useTransform(scrollYProgress, [0, 1], ["169px", "790px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const socialOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const socialTranslateY = useTransform(scrollYProgress, [0.5, 0.7], [100, 0]);

  const smoothOpacity = useSpring(socialOpacity, {
    stiffness: 100,
    damping: 20,
  });
  const smoothTranslateY = useSpring(socialTranslateY, {
    stiffness: 100,
    damping: 20,
  });

  return (
    <div ref={ref} className="h-[400vh] bg-[#0A0A0A]/95 overflow-x-clip">
      <div className="w-screen h-[100vh] sticky top-0">
        <div className="absolute top-1/2 -translate-y-1/2 w-full overflow-hidden z-0">
          <motion.div
            style={{
              wordSpacing: "120px",
            }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex flex-col whitespace-nowrap text-[20vw] font-bold text-white w-max"
          >
            <span className="mx-8">LEIGHTON LEIGHTON LEIGHTON</span>
          </motion.div>
          {/* <motion.div
          style={{opacity}} 
          className="absolute top-0 bg-black w-full h-full">

          </motion.div> */}
        </div>

        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[400vw] overflow-hidden z-0">
          <motion.div
            style={{
              wordSpacing: "120px",
              opacity,
            }}
            animate={{ x: ["0%", "50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex flex-col whitespace-nowrap text-[13vw] font-bold text-white w-max leading-[30rem]"
          >
            <span className="mx-8">LEIGHTON LEIGHTON LEIGHTON</span>
            <span className="mx-8">MUSEUM MUSEUM MUSEUM</span>
          </motion.div>
        </div>

        <motion.div
          style={{ width, height }}
          className="absolute top-[43%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-4xl overflow-hidden"
        >
          <motion.iframe
            src="https://player.vimeo.com/video/293528154?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&controls=0&loop=1"
            className="w-full h-full pointer-event-none z-30"
            allow="autoplay; picture-in-picture"
            allowFullScreen
            title="Leighton Museum"
          />
        </motion.div>

        <motion.div
          style={{
            opacity: smoothOpacity,
            y: smoothTranslateY,
          }}
          className="text-white text-3xl absolute bottom-1/10 flex px-[10%] justify-between w-screen z-50"
        >
          <div className="mix-blend-color flex gap-8">
            <h1 className="text-[10vh] font-black uppercase">
              Leighton
              <span className="text-[3vh] font-medium pl-2">Museum</span>
            </h1>

            <div className="text-[12px] font-semibold mt-auto pb-[14px]">
              <p className="text-gray-500">Current Location</p>
              <p className="text-white text-[17px]">London, United Kingdom</p>
            </div>
          </div>

          <motion.div className="flex h-auto items-center mt-auto pb-4 gap-2 text-[1.9rem]">
            {socialLinks.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-[1px] bg-white text-black rounded-md"
                >
                  <motion.div whileHover={{scale: 0.8}}>{item.icon}</motion.div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
