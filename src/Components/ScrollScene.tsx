import { Canvas } from "@react-three/fiber";
import { OrbitControls,useProgress } from "@react-three/drei";
import Museum from "./Museum";
// import EntranceCamera from "./EntranceCamera";
import { useRef,useState,useEffect } from "react";
import ScrollCameraController from "./ScrollCameraController";
import EntranceCamera from "./EntranceCamera";
type SceneProps = {
  className?: string;
  setIsLoaded: (arg0: boolean) => void
};

const ScrollScene = ({ className,setIsLoaded }: SceneProps) => {

  // const cameraRef = useRef<OrbitControls | null>(null);

    const { progress, loaded } = useProgress();

  
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
        {/* <OrbitControls
          ref={cameraRef}
          minDistance={5}
          maxDistance={50}
          target={[-0.2, 5, 23]}
          enableDamping={false}
          enableRotate={false}
          enableZoom={false}
        /> */}
        {/* <EntranceCamera></EntranceCamera> */}
        <ScrollCameraController></ScrollCameraController>
      </Canvas>
    </div>
  );
};

export default ScrollScene;
