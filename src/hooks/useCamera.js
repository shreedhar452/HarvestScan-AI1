import { useRef, useState } from "react";

export default function useCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isCameraOn, setIsCameraOn] =
    useState(false);

  async function startCamera() {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment"
          }
        });

      if (videoRef.current) {
        videoRef.current.srcObject =
          stream;
      }

      setIsCameraOn(true);
    } catch (error) {
      console.error(error);
      alert(
        "Camera access denied"
      );
    }
  }

  function captureImage() {
    const canvas =
      canvasRef.current;

    const video =
      videoRef.current;

    if (!canvas || !video) {
      return null;
    }

    const ctx =
      canvas.getContext("2d");

    canvas.width = 224;
    canvas.height = 224;

    ctx.drawImage(
      video,
      0,
      0,
      224,
      224
    );

    return canvas.toDataURL(
      "image/png"
    );
  }

  return {
    videoRef,
    canvasRef,
    isCameraOn,
    startCamera,
    captureImage
  };
}