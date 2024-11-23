import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Loader from "../components/loader";
import Piano from "@/models/Piano";
import { Navbar } from "@/components/Nabvar";
import HomeText from "@/components/HomeText";
import MusicNotes from "@/components/MusicNotes";

const Home = () => {
  const adjustModelForScreenSize = () => {
    let screenScale = null;
    const screenPosition = [35, 1.5, -43];
    const rotation = [0, Math.PI, 5];

    if (window.innerWidth < 480) {
      screenScale = [1.0, 1.0, 1.0];
      screenPosition[0] = 30;
    } else if (window.innerWidth < 768) {
      screenScale = [1.2, 1.2, 1.2];
      screenPosition[0] = 32;
    } else if (window.innerWidth < 1024) {
      screenScale = [2.0, 2.0, 2.0];
      screenPosition[0] = 34;
    } else {
      screenScale = [2.5, 2.5, 2.5];
      screenPosition[0] = 35;
    }

    return { screenScale, screenPosition, rotation };
  };

  const {
    screenScale: pianoScale,
    screenPosition: pianoPosition,
    rotation: pianoRotation,
  } = adjustModelForScreenSize();

  return (
    <div className="relative min-h-screen">
      <HomeText />
      <section className="w-full h-screen relative bg-red-500">
        <Navbar />

        <Canvas
          className="w-full h-screen bg-transparent absolute top-0 left-0"
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
    </div>
  );
};

export default Home;
