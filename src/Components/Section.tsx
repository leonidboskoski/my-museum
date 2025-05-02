import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type SectionProps = {
  text: string;
  text2: string;
  className: string;
};

export const Section = ({ text,className,text2 }: SectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const isInView = useInView(sectionRef, {
    margin: "-200px"
  });

  useEffect(() => {
    if (isInView) {
      setVisible(true);
    } else setVisible(false);
  }, [isInView]);

  return (
    <motion.div className="h-[100vh]">
      <motion.h1
        variants={{
          visible: { opacity: 1, y: 0, transition:{delay:0.1} },
          hidden: { opacity: 0, y: 20, },
        }}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        transition={{
          duration: 0.55,
          ease: "easeOut",
          delay: visible ? 0.2 : 0,
        }}
        ref={sectionRef}
        className={`sticky md:top-[60vh] lg:top-[40vh] text-center ${className} flex flex-col gap-10 `}
      >
        <span className="max-sm:text-[30px] md:text-2xl lg:text-[3vw] 2xl:text-7xl uppercase font-bold">{text}</span>
        <span className="max-sm:px-0 max-sm:text-[30px] md:text-sm  lg:text-[1.2vw] 2xl:text-xl px-[19%] text-justify sm:leading-[20px] md:leading-[30px] font-thin">{text2}</span>
      </motion.h1>
    </motion.div>
  );
};
