import { useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";

const Museum = () => {
  // Main Model- 150MB
  // const { scene } = useGLTF("/models/scene.gltf");
  // return <primitive object={scene} scale={1}></primitive>

  // //Main Model DRACO GLB - 37MB
  const { scene } = useGLTF("/models/scene-draco3.glb");
  return <primitive object={scene} scale={1}></primitive>

  // Main Model DRACO GLB - 25MB
  // const { scene } = useGLTF("/models/scene-draco2.glb");
  // return <primitive object={scene} scale={1}></primitive>

  // DRACO Main Model GLB - 75MB - KRS ZA MN MB
  // const { scene } = useGLTF("/models/scene-draco.glb");
  // return <primitive object={scene} scale={1}></primitive>

  //   const gltf = useLoader(GLTFLoader, '/models/scene-draco.glb', (loader) => {
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  //   loader.setDRACOLoader(dracoLoader);
  // });
  // return <primitive object={gltf.scene} />;

  // /museum/gltf-67mb -treba pozicioniranje na btns
  // const { scene } = useGLTF("/models/museum/scene.gltf");
  // return <group position={[-0.7,1,-4.2]} rotation={[0,Math.PI / 2.000, 0]}>
  //   <primitive object={scene} scale={1}></primitive>
  // </group>;

  // /museum/glb_45mb - KRS
  // const { scene } = useGLTF("/models/museum/scene_glb_45mb.glb");
  // return <group position={[-0.7,1,-4.2]} rotation={[0,Math.PI / 2.000, 0]}>
  //   <primitive object={scene} scale={1}></primitive>
  // </group>;

  // /museum/glb_69mb -repozicioniranje na btns
  // const { scene } = useGLTF("/models/museum/scene_glb_69mb.glb");
  // return <group position={[-0.7,1.5,-4]} rotation={[0,Math.PI / 2.000, 0]}>
  //   <primitive object={scene} scale={1}></primitive>
  // </group>;

  // /museum/glb_85mb - Premnogu MB a KRS
  // const { scene } = useGLTF("/models/museum/scene_glb_85mb.glb");
  // return <group position={[0,0,0]} rotation={[0,0,0]}>
  //   <primitive object={scene} scale={1}></primitive>
  // </group>;
};

export default Museum;
