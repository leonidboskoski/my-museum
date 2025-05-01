import { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import HeroSection from "./Components/HeroSection";
import CardsParallaxSection from "./Components/CardsParallaxSection";
import CustomCursor from "./Components/CustomCursor";
import Loader from "./Components/Loader";
import ScrollingSection from "./Components/ScrollingSection";
import InteractSection from "./Components/InteractSection";
import Lenis from "@studio-freight/lenis";

const App = () => {

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const [IsSectionVisible, setIsSectionVisible] = useState<boolean>(true);
  const [IsSectionVisible2, setIsSectionVisible2] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      <Loader isLoaded={isLoaded} />

      <main className="h-auto bg-[#0A0A0A]/95 overflow-x-clip">

        <CustomCursor />

        <Nav IsSectionVisible={IsSectionVisible} IsSectionVisible2={IsSectionVisible2}/>
        
        <HeroSection setIsSectionVisible={setIsSectionVisible}/>
        
        <CardsParallaxSection/>

        <ScrollingSection setIsSectionVisible2={setIsSectionVisible2}setIsLoaded={setIsLoaded}/>
        
        <InteractSection />
        
      </main>
    </>
  );
};

export default App;
