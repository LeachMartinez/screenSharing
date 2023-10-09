import { useRef, useState } from "react";
import styles from "./VideoComponent.module.scss";

const VideoComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const stopCapture = async () => {
    const srcObj = videoRef.current!.srcObject as MediaStream;
    const tracks = srcObj.getTracks();

    tracks.forEach(track => {
      track.stop();
    });

    videoRef.current!.srcObject = null;
  }

  const onStartCapture = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    isSharing ? await startCapture() : stopCapture();
    setIsSharing((isSharing) => !isSharing);
  }

  async function startCapture() {
    let captureStream = null;
  
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia({
        audio: true
      });
      videoRef.current!.srcObject = captureStream;
    } catch (err) {
      console.error(`Error: ${err}`);
    }
    return captureStream;
  }

  return (
    <div className={styles.sharing__wrapper} draggable={true}>

      <video 
        ref={videoRef}
        className={styles.sharing__videoContainer}
        autoPlay></video>

      <div className={styles.sharing__buttons}>
        <button onClick={event => onStartCapture(event)}>
    
        </button>
      </div>
    </div>
  )
}

export default VideoComponent;