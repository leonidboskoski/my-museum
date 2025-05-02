import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import Museum from "./Museum";
import { useEffect } from "react";
import ScrollCameraController from "./ScrollCameraController";
type SceneProps = {
  className?: string;
  setIsLoaded: (arg0: boolean) => void
};

const ScrollScene = ({ className,setIsLoaded }: SceneProps) => {
    const { loaded } = useProgress();

  
    useEffect(() => {
      if (loaded) {
        const timeout = setTimeout(() => {
          setIsLoaded(true)
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }, [loaded]);

  return (
    <div className={`${className}`}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ fov: 60, near: 0.1, far: 1000 }}
      >

        <Museum />
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <ScrollCameraController></ScrollCameraController>
      </Canvas>
    </div>
  );
};

export default ScrollScene;
