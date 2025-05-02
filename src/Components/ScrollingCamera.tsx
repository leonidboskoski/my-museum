import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger)

const ScrollingCamera = () => {
  const { camera } = useThree();
  useLayoutEffect(()=>{
    const timeline = gsap.timeline({
        trigger: '.scroll-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    })

    timeline.to(camera.position,{
        x: 30,
        y: 10,
        z: 10,
        duration: 1
    })
    
  },[])
  return null;
};

export default ScrollingCamera;
