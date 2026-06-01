import { useRef, useState, useEffect } from "react";

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [cameraStarted, setCameraStarted] =
    useState(false);

  async function startCamera() {
    try {
      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment",
            },
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
          },
          audio: false,
        });

      if (videoRef.current) {
        videoRef.current.srcObject =
          mediaStream;
      }

      setStream(mediaStream);
      setCameraStarted(true);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to access camera. Please allow camera permissions."
      );
    }
  }

  function stopCamera() {
    if (stream) {
      stream
        .getTracks()
        .forEach((track) =>
          track.stop()
        );
    }

    setCameraStarted(false);
    setStream(null);
  }

  function captureImage() {
    const video =
      videoRef.current;

    const canvas =
      canvasRef.current;

    if (!video || !canvas) return;

    const ctx =
      canvas.getContext("2d");

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const image =
      canvas.toDataURL(
        "image/jpeg",
        0.9
      );

    onCapture(image);
  }

  useEffect(() => {
    return () => {
      if (stream) {
        stream
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }
    };
  }, [stream]);

  return (
    <div className="camera-container">

      {!cameraStarted && (
        <button
          className="btn-primary"
          onClick={startCamera}
        >
          📷 Start Camera
        </button>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-preview"
      />

      {cameraStarted && (
        <div className="camera-actions">

          <button
            className="btn-primary"
            onClick={captureImage}
          >
            📸 Capture Image
          </button>

          <button
            className="btn-secondary"
            onClick={stopCamera}
          >
            ❌ Stop Camera
          </button>

        </div>
      )}

      <canvas
        ref={canvasRef}
        hidden
      />
    </div>
  );
}