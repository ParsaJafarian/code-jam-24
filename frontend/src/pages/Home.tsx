import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Loader from "../components/loader";
import Piano from "@/models/Piano";

const Home = () => {
  const adjustModelForScreenSize = () => {
    let screenScale = null;
    const screenPosition = [0, -6.5, -43];
    const rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1.6, 1.6, 1.6];
    } 

    return { screenScale, screenPosition, rotation };
  };

  const {
    screenScale: pianoScale,
    screenPosition: pianoPosition,
    rotation: pianoRotation,
  } = adjustModelForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight intensity={3} position={[1, 1, 1]} />
          <ambientLight intensity={1} />
          <hemisphereLight 
            color="#b1e1ff" 
            groundColor="#000000" 
            intensity={1} 
          />
          <Piano
            scale={pianoScale}
            position={pianoPosition}
            rotation={pianoRotation}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
