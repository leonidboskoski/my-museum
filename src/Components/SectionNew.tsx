import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type SectionProps = {
  text: string;
  text2: string;
  className: string;
};

export const SectionNew = ({ text,className,text2 }: SectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);


  const windowWidth = window.innerWidth
  const amount = windowWidth < 500 ? 0.4 : 0.8
  
  const isInView = useInView(sectionRef, {
    amount: amount
  });

  useEffect(() => {
    if (isInView) {
      setVisible(true);
    } else setVisible(false);
  }, [isInView]);

  return (
    <motion.div
    ref={sectionRef} 
    className="h-[100vh] relative">
      <motion.div
        variants={{
          visible: { opacity: 1, y: 0, transition:{delay:0.1} },
          hidden: { opacity: 0, y: 20, },
        }}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
        
        className={`sticky md:top-[60vh] lg:top-[40vh] text-center ${className} flex flex-col gap-10`}
      >
        <h1 className="max-sm:text-[45px] max-md:text-4xl max-md:text-wrap max-md:text-center md:text-5xl lg:text-5xl 2xl:text-7xl uppercase font-bold">{text}</h1>
        <p className="max-sm:px-0 max-sm:text-[20px] max-md:text-[25px] md:text-xl  lg:text-2xl 2xl:text-xl px-[19%] lg:text-justify sm:leading-[20px] md:leading-[30px] font-thin">{text2}</p>
      </motion.div>
    </motion.div>
  );
};
