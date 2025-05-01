import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";

const EntranceCamera = () => {
  const { camera } = useThree();

  useLayoutEffect(() => {
    gsap.to(camera.position, {
      x: -0.1,
      y: 4,
      z: -24,
      duration: 2,
      ease: "power2.inOut",
    });
  },[camera])

  return null;
};

export default EntranceCamera;
