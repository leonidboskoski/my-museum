import { IoMdClose } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type NavProps = {
  IsSectionVisible: boolean;
  IsSectionVisible2: boolean;
  onScrollToSection: (section: string) => void;
};

const mobileLinks = [
  { title: "Reveal", scrollTo: "top" },
  { title: "Before you Go", scrollTo: "middle" },
  { title: "Go Beyond", scrollTo: "bottom" },
];

const menuVars = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0.1, 0.29, 0],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay:0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    }
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      staggerDirection: 1,
    }
  }
}

const Nav = ({
  IsSectionVisible,
  IsSectionVisible2,
  onScrollToSection,
}: NavProps) => {
  const [menu, toggleMenu] = useState<boolean>(false);

  const handleMenuClick = (text:string) => {
    toggleMenu(() => !menu)
    onScrollToSection(text)
  }
  
  return (
    <>
      <nav className="fixed top-10 max-sm:px-[5%] px-[3%] justify-between flex w-screen font-extrabold items-center mix-blend-difference z-50">
        <div
          className={`text-3xl tracking-tighter flex mix-blend-difference text-white ${
            IsSectionVisible ? "" : "cursor-pointer"
          }`}
        >
          <FlipLink
            IsSectionVisible={IsSectionVisible}
            IsSectionVisible2={IsSectionVisible2}
          >
            Leighton Museum&copy;
          </FlipLink>
        </div>
        <div className="hidden md:flex gap-5 font-bold mix-blend-difference text-white items-center cursor-pointer">
          <div onClick={() => onScrollToSection("top")}>Reveal</div>
          <div onClick={() => onScrollToSection("middle")}>Before you Go</div>
          <motion.button
            whileHover={{
              backgroundColor: "#ffffff",
              color: "#000000",
              scale: 1.05,
              boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.3)",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border border-white rounded-full px-4 py-2 text-white bg-transparent cursor-pointer"
            onClick={() => onScrollToSection("bottom")}
          >
            Go Beyond
          </motion.button>
        </div>
        <div className="sm:hidden md:hidden">
          <IoIosMenu
            onClick={() => toggleMenu(!menu)}
            size={50}
            className="text-white"
          ></IoIosMenu>
        </div>
      </nav>
      
      {/* HAMBURGER MENU */}
      <AnimatePresence>
        {menu && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="sm:hidden fixed inset-0 h-screen bg-black w-screen z-[9999] origin-top"
          >
            <div className="absolute top-[4.5%] left-[84%] text-white z-[200]">
              <IoMdClose
                onClick={() => toggleMenu(!menu)}
                size={42}
              ></IoMdClose>
            </div>

            <motion.div
            variants={containerVars}
            initial="initial"
            animate="open"
            exit="initial"
            className="text-white text-4xl flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-6 w-screen items-center uppercase font-bold">
              {mobileLinks.map((item, index) => {
                return (
                  <MobileNavLink
                    key={index}
                    title={item.title}
                    scrollTo={item.scrollTo}
                    handleMenuClick={handleMenuClick}
                  ></MobileNavLink>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;

const FlipLink = ({
  children,
  IsSectionVisible,
  IsSectionVisible2,
}: {
  children: string;
  IsSectionVisible: boolean;
  IsSectionVisible2: boolean;
}) => {
  const DURATION = 0.25;
  const STAGGER = 0.025;
  return (
    <motion.a
      initial="initial"
      whileHover={IsSectionVisible ? undefined : "hovered"}
      className="relative block overflow-hidden whitespace-nowrap"
      animate={IsSectionVisible || IsSectionVisible2 ? "hidden" : "visible"}
    >
      <div>
        {children.split("").map((char, index) => {
          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
                visible: { y: 0 },
                hidden: { y: "-106%" },
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
                visible: { y: 0 },
                hidden: { y: "106%" },
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

const MobileNavLink = ({
  title,
  scrollTo,
  handleMenuClick
}: {
  title: string;
  scrollTo: string;
  handleMenuClick: (arg:string) => void;
}) => {
  const mobileLinkVars = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37,0,0.63,1]
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0,0.55,0.45,1]
      },
    },
  };
  return (
    <div className="overflow-hidden">
      <motion.div variants={mobileLinkVars} onClick={() => handleMenuClick(scrollTo)}>
        {title}
      </motion.div>
    </div>
  );
};
