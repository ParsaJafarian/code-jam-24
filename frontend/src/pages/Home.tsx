import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/loader";
import Piano from "@/models/Piano";

const Home = () => {
  const adjustModelForScreenSize = () => {
    let screenScale = null;
    const screenPosition = [0, -6.5, 0.9];
    const rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.6, 0.6, 0.6];
    } else {
      screenScale = [0.7, 0.7, 0.7];
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
          <ambientLight intensity={0.5} />
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
