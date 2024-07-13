import { useState, useEffect } from "react";
import styles from "./loadingBar.module.css";

const LoadingBar = ({ loadingTime }) => {
  const [progress, setProgress] = useState(0);

  const progressBarStyles = {
    width: `${progress}%`,
    height: "100%",
    backgroundColor: "#007bff",
    animation: `progressAnimation ${loadingTime} linear forwards`,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          clearInterval(interval);
          return prevProgress;
        }
      });
    }, loadingTime * 10);

    return () => clearInterval(interval);
  }, [loadingTime]);

  return (
    <div className={styles.loadingBar}>
      <div className={styles.progress}>
        {progress}
        {" %"}
      </div>
      <div
        // className={styles.progressBar}
        style={progressBarStyles}
      ></div>
    </div>
  );
};

export default LoadingBar;
