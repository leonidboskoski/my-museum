// Utils
import { setupLenis } from "./assets/scrollHelpers";
import { useEffect, useState, useRef} from "react";
import {gsap} from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Components
import Nav from "./Components/Nav";
import HeroSection from "./Components/HeroSection";
import CardsParallaxSection from "./Components/CardsParallaxSection";
import CustomCursor from "./Components/CustomCursor";
import Loader from "./Components/Loader";
import ScrollingSection from "./Components/ScrollingSection";
import InteractSection from "./Components/InteractSection";

gsap.registerPlugin(ScrollToPlugin)

const App = () => {
  const [IsSectionVisible, setIsSectionVisible] = useState<boolean>(true);
  const [IsSectionVisible2, setIsSectionVisible2] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Lenis Smooth Scroll
  useEffect(() => {
    setupLenis()
  }, []);

  const topRef = useRef<HTMLDivElement | null>(null)
  const middleRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const handleClick = (section: string) => {
    let targetRef: HTMLElement | null = null;

    if (section === "top") {
      targetRef = topRef.current;
    } else if (section === "middle") {
      targetRef = middleRef.current;
    } else if (section === "bottom") {
      targetRef = bottomRef.current;
    }

    if (targetRef) {
      gsap.to(window, {
        duration: 3.5,
        scrollTo: targetRef,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <>
      <Loader isLoaded={isLoaded} />

      <main className="h-auto bg-[#0A0A0A]/95 overflow-x-clip">

        <CustomCursor />

        <Nav IsSectionVisible={IsSectionVisible} IsSectionVisible2={IsSectionVisible2} onScrollToSection={handleClick}/>
        
        <div ref={topRef}><HeroSection setIsSectionVisible={setIsSectionVisible}/></div>
        
        <div ref={middleRef}><CardsParallaxSection/></div>

        <ScrollingSection setIsSectionVisible2={setIsSectionVisible2}setIsLoaded={setIsLoaded}/>
        
        <div ref={bottomRef}><InteractSection /></div>
        
      </main>
    </>
  );
};

export default App;
