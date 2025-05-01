import { AnimatePresence,motion } from "framer-motion";
import LoaderAnimation from "./LoaderAnimation"

type LoaderProps = {
    isLoaded: boolean
}

const Loader = ({isLoaded} : LoaderProps) => {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: "-100%", opacity: 0 },
          }}
          animate="visible"
          exit="hidden"
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed top w-screen h-screen bg-black flex items-center justify-center z-[99999] overflow-hidden"
        >
          <LoaderAnimation></LoaderAnimation>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
