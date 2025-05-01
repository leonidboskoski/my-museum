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
    margin: "-450px",
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
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 },
        }}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        transition={{
          duration: 0.55,
          ease: "easeOut",
          delay: visible ? 0.2 : 0,
        }}
        ref={sectionRef}
        className={`sticky top-[40vh] text-center ${className} flex flex-col gap-10 `}
      >
        <span className="text-7xl uppercase font-bold">{text}</span>
        <span className="text-xl px-[19%] text-justify leading-[30px] font-thin">{text2}</span>
      </motion.h1>
    </motion.div>
  );
};
