import { motion } from "framer-motion";

type NavProps = {
  IsSectionVisible: boolean;
  IsSectionVisible2: boolean
};

const Nav = ({ IsSectionVisible,IsSectionVisible2 }:  NavProps) => {
  
  return (
    <nav className="fixed top-10 px-[3%] justify-between flex w-screen font-extrabold items-center mix-blend-difference z-50">
        <div
        className={`text-3xl tracking-tighter flex mix-blend-difference text-white ${IsSectionVisible ? "" : "cursor-pointer"}`}>
          <FlipLink IsSectionVisible={IsSectionVisible} IsSectionVisible2={IsSectionVisible2}>Leighton Museum&copy;</FlipLink>
        </div>  
      <div className="flex gap-5 font-bold mix-blend-difference text-white items-center cursor-pointer">
        <div>Work</div>
        <div>Background</div>
        <motion.button
          whileHover={{
            backgroundColor: "#ffffff",
            color: "#000000",
            scale: 1.05,
            boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.3)",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="border border-white rounded-full px-4 py-2 text-white bg-transparent cursor-pointer"
        >
          Reach out
        </motion.button>
      </div>
    </nav>
  );
};

export default Nav;

const FlipLink = ({ children,IsSectionVisible,IsSectionVisible2 }: { children: string,IsSectionVisible:boolean,IsSectionVisible2:boolean }) => {
  const DURATION = 0.25;
  const STAGGER = 0.025;
  return (
    <motion.a
      initial="initial"
      whileHover={IsSectionVisible ? undefined : "hovered"}
      className="relative block overflow-hidden whitespace-nowrap"
      animate={(IsSectionVisible || IsSectionVisible2) ? "hidden" : "visible"}
    >
      <div>
        {children.split("").map((char, index) => {
          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
                visible: { y: 0},
                hidden:  {y: "-106%"}
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * index,
              }}
              key={index}
              className={`relative inline-block ${
                index == 15
                  ? "inline-block font-semibold text-sm absolute -top-2.5 ml-0.5"
                  : ""
              } ${index == 8 ? "mr-2" : "mr-0"}`}
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
                initial: { y: 0 },
                hovered: { y: "-100%" },
                visible: { y: 0},
                hidden:  {y: "106%"}
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * index,
              }}
              key={index}
              className={`relative inline-block ${
                index == 15
                  ? "inline-block font-semibold text-sm absolute -top-4.5 ml-0.5"
                  : ""
              } ${index == 8 ? "mr-2" : "mr-0"}`}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    </motion.a>
  );
};
