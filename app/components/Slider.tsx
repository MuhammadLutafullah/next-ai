"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Slider3D.module.css";

interface Image {
  small: string;
  medium: string;
  large: string;
  xlarge: string;
  default: string;
}

const Slider3D = ({ images }: { images: Image[] }) => {
  const objectRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const rotationSpeed = useRef(0.3);

  // Ensure we have exactly 8 images, with fallbacks if needed
  const sliderImages =
    Array.isArray(images) && images.length === 8
      ? images
      : Array(8).fill(
          images?.[0] || {
            small: "/images/500 x 438C.jpg",
            medium: "/images/800 x 700C.jpg",
            large: "/images/1080 x 945C.jpg",
            xlarge: "/images/1600 x1400C.jpg",
            default: "/images/1920 x 1619C.jpg",
          }
        );

  useEffect(() => {
    let currentRotation = 0;

    const animate = () => {
      if (objectRef.current && isRotating) {
        currentRotation += rotationSpeed.current;
        currentRotation = currentRotation % 360;
        objectRef.current.style.transform = `rotateX(20deg) rotateY(${currentRotation}deg) rotateZ(0)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRotating]);

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return (
    <div className={styles._3dBlock}>
      <div className={styles._3dContainer}>
        <div className={styles._3dWrapper}>
          <div
            className={styles._3dObject}
            ref={objectRef}
            onClick={toggleRotation}
          >
            {sliderImages.map((src, index) => (
              <div
                key={index}
                className={`${styles._3dFace} ${styles[`_0${index + 1}`]}`}
              >
                <Image
                  src={src.default}
                  alt={`Slider Image ${index + 1}`}
                  width={800}
                  height={700}
                  className={
                    index === 0 || index === 4
                      ? styles._3dFrontImage
                      : styles._3dImage
                  }
                  priority={index < 2}
                  sizes="(max-width: 479px) 500px, (max-width: 767px) 800px, (max-width: 991px) 1080px, (max-width: 1279px) 1600px, 1920px"
                  // srcSet={`
                  //   ${src.small} 500w,
                  //   ${src.medium} 800w,
                  //   ${src.large} 1080w,
                  //   ${src.xlarge} 1600w,
                  //   ${src.default} 1920w
                  // `}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider3D;
