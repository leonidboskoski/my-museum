import { gsap } from "gsap";

export const AnimationClick = (cameraPos: [number, number, number], cameraLookAt: [number, number, number], controlsRef) => {
    gsap.to(controlsRef.current.object.position, {
      x: cameraPos[0],
      y: cameraPos[1],
      z: cameraPos[2],
      duration: 2,
      ease: "power3.inOut",
    });

    gsap.to(controlsRef.current.target, {
      x: cameraLookAt[0],
      y: cameraLookAt[1],
      z: cameraLookAt[2],
      duration: 2,
      ease: "power3.inOut",
    });
  };

