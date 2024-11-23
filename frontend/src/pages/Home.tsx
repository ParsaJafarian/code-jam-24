import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/loader";
import Piano from "@/models/Piano";
import { Navbar } from "@/components/Nabvar";
import HomeText from "@/components/HomeText";

const Home = () => {
  const [pianoScale, setPianoScale] = useState([0, 0, 0]);
  const [pianoPosition, setPianoPosition] = useState([0, 0, 0]);
  const [pianoRotation, setPianoRotation] = useState([0, 0, 0]);

  const adjustModelForScreenSize = () => {
    if (window.innerWidth < 768) {
      setPianoScale([1.0, 1.0, 1.0]);
      setPianoPosition([20, 1.5, -43]);
    } else if (window.innerWidth < 1370) {
      setPianoScale([1.8, 1.8, 1.8]);
      setPianoPosition([25, 1.5, -43]);
    } else {
      setPianoScale([2.5, 2.5, 2.5]);
      setPianoPosition([35, 1.5, -43]);
    }
  };

  useEffect(() => {
    adjustModelForScreenSize();
    window.addEventListener("resize", () => adjustModelForScreenSize());

    return () =>
      window.removeEventListener("resize", () => adjustModelForScreenSize());
  }, []);

  return (
    <div className="w-full h-screen relative">
      <HomeText />
      <section className="w-full h-screen relative bg-red-500">
        <Navbar />

        <Canvas
          className="w-full min-h-screen bg-transparent absolute top-0 left-0"
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
