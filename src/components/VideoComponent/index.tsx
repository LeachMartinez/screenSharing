import { useRef } from "react";
// import styles from "./VideoComponent.module.scss";

const VideoComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onStopCapture = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const srcObj = videoRef.current!.srcObject as MediaStream;
    const tracks = srcObj.getTracks();

    tracks.forEach(track => {
      track.stop();
    });

    videoRef.current!.srcObject = null;
  }

  const onStartCapture = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    await startCapture();
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
    <>
      <div>Screen Sharing</div>
      <video ref={videoRef} style={{
        width: "300px",
        height: "300px"
      }} autoPlay></video>
      <button onClick={event => onStartCapture(event)}>Start</button>
      <button onClick={event => onStopCapture(event)}>Stop</button>
    </>
  )
}

export default VideoComponent;