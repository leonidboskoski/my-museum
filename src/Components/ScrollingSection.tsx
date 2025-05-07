import ScrollScene from "./ScrollScene";
import { SectionNew } from "./SectionNew";
import { scrollSections } from "../assets/buttons";
import { useInView } from "framer-motion";
import { useRef, useEffect,useState } from "react";

const sectionHeight = scrollSections.length * 100;

type ScrollingSectionProp = {
  setIsSectionVisible2: (arg: boolean) => void;
  setIsLoaded: (arg: boolean) => void;
};


const ScrollingSection = ({
  setIsSectionVisible2,
  setIsLoaded,
}: ScrollingSectionProp) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, { amount: 0.1 });

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isInView) setIsSectionVisible2(true);
    else setIsSectionVisible2(false);
  }, [isInView, setIsSectionVisible2]);

  return (
    <div ref={ref} className="h-auto">
      <div
        className="w-full flex text-4xl"
        style={{ height: `${sectionHeight}vh` }}
      >
        {windowWidth > 500 ? (<section className="flex flex-col flex-1 min-w-0 md:bg-[#0A0A0A]/92 text-white rounded-tl-3xl">
          {scrollSections.map((item, key) => (
            <SectionNew
              className={"scroll-element-" + key}
              text={item.name}
              text2={item.description}
              key={key}
            />
          ))}
        </section>) : null}

        <section
          className="flex-1 relative"
          style={{ height: `${sectionHeight}vh` }}
        >
          <ScrollScene
            setIsLoaded={setIsLoaded}
            className="h-[100vh] sticky top-0"
          />

          {windowWidth < 500 ? (<div className="absolute top-0 z-20">
            <section className="flex flex-col flex-1 min-w-0 text-white rounded-tl-3xl">
              {scrollSections.map((item, key) => (
                <SectionNew
                  className={"scroll-element-" + key}
                  text={item.name}
                  text2={item.description}
                  key={key}
                />
              ))}
            </section>
          </div>) : null}

          {/* SCROLLABLE FOR THE MOBILE ON THE CANVAS */}
          <div
            className={`absolute bg-black/50 md:bg-transparent inset-0 h-[${sectionHeight}]`}
          ></div>
        </section>
      </div>
    </div>
  );
};

export default ScrollingSection;
