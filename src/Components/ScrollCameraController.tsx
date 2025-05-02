import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { scrollSections } from "../assets/buttons";

gsap.registerPlugin(ScrollTrigger);

const ScrollCameraController = () => {
  const controlsRef = useRef<any>(null);

  useLayoutEffect(() => {
    scrollSections.forEach((button, index) => {
      const [camX, camY, camZ] = button.cameraPosition;
      const [lookX, lookY, lookZ] = button.cameraLookAt;


      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.scroll-element-${index}`,
          start: "top bottom",
          end: "top top",
          scrub: true,
          immediateRender: false,
        },
        onUpdate: () => {
          if (controlsRef.current) controlsRef.current.update();
        },
      });

      tl.to(controlsRef.current.object.position, { x: camX, y: camY, z: camZ }, 0)
        .to(controlsRef.current.target, { x: lookX, y: lookY, z: lookZ }, 0);
    });
  }, []);

  return (
    <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} enableRotate={false} />
  );
};

export default ScrollCameraController;
