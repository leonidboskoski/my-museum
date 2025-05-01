import ScrollScene from "./ScrollScene";
import { Section } from "./Section";
import { scrollSections } from "../assets/buttons";
import { useInView } from "framer-motion"
import {useRef,useEffect} from "react"

const sectionHeight = scrollSections.length * 100

type ScrollingSectionProp = {
  setIsSectionVisible2: (arg: boolean) => void
  setIsLoaded: (arg:boolean) => void
}
 
const ScrollingSection = ({setIsSectionVisible2,setIsLoaded} : ScrollingSectionProp) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref,{amount: 0.1})
  useEffect(()=>{
    if(isInView) setIsSectionVisible2(true)
      else setIsSectionVisible2(false)
  },[isInView, setIsSectionVisible2])

  return (
    <div ref={ref}>
      <div className={`w-full flex text-4xl h-[${sectionHeight}vh]`}>
      <section className="flex flex-col flex-1 bg-[#0A0A0A]/92 text-white rounded-tl-3xl">
        {scrollSections.map((item, key) => {
          return <Section className={"scroll-element-" + key} text={item.name} text2={item.description} key={key} />;
        })}
      </section>

      <section className={`flex-1 h-[${sectionHeight}vh]`}>
        <ScrollScene setIsLoaded={setIsLoaded} className="h-[100vh] sticky top-0"></ScrollScene>
      </section>
    </div>
    </div>
  );
};

export default ScrollingSection;
