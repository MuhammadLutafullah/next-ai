"use client";
import { useEffect, useRef } from "react";
import styles from "./Slider3D.module.css";

const Preloader = ({ onComplete }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    const progressBar = progressRef.current;
    let width = 0;

    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
        onComplete(); // Notify parent when progress completes
        return;
      }
      width += 2;
      progressBar.style.width = `${width}%`;
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={styles.preloader}>
      <div className={styles.preloaderContainer}>
        <div className={styles.preloaderPadding}>
          <div className={styles.preloaderWrapper}>
            <div className={styles.preloaderLine}>
              <div
                ref={progressRef}
                className={styles.preloaderProgressBar}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
