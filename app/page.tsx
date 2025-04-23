"use client";
import { useState } from "react";
import Slider3D from "./components/Slider";
import Preloader from "./components/Preloader";
import defaultImg from "./images/1920 x 1619C.jpg";
import xlargeImg from "./images/1600 x1400C.jpg";
import largeImg from "./images/1080 x 945C.jpg";
import mediumImg from "./images/800 x 700C.jpg";
import smallImg from "./images/500 x 438C.jpg";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [sliderImages] = useState(
    Array(8).fill({
      small: smallImg,
      medium: mediumImg,
      large: largeImg,
      xlarge: xlargeImg,
      default: defaultImg,
    })
  );

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : (
        <>
          <h1>3D Slider Demo</h1>
          <Slider3D images={sliderImages} />
        </>
      )}
    </>
  );
}
