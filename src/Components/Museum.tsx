import { useGLTF } from "@react-three/drei";

const Museum = () => {
  // //Main Model DRACO GLB - 37MB
  const { scene } = useGLTF("/models/scene-draco3.glb");
  return <primitive object={scene} scale={1}></primitive>;
};

export default Museum;
