import { useState } from "react";

import CameraCapture from "../components/CameraCapture";
import UploadImage from "../components/UploadImage";
import ImageQuality from "../components/ImageQuality";
import ScanResult from "../components/ScanResult";

import { predictGrain } from "../services/modelService";
import { saveScan } from "../services/storageService";

export default function Scanner() {
  const [image, setImage] = useState(null);
  const [qualityInfo, setQualityInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleNewImage(img) {
    setImage(img);
    setResult(null);
    setQualityInfo(null);
  }

  async function handleAnalyze() {
    if (!image) {
      alert("Please capture or upload a grain image.");
      return;
    }

    try {
      setLoading(true);

      const prediction =
        await predictGrain(image);

      setResult(prediction);

      saveScan({
        ...prediction,
        image,
        timestamp:
          new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);

      alert(
        "Unable to analyze image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function getQualityClass() {
    if (!qualityInfo) return "";

    switch (qualityInfo.quality) {
      case "High":
        return "quality-high";

      case "Medium":
        return "quality-medium";

      case "Low":
        return "quality-low";

      default:
        return "";
    }
  }

  return (
    <div className="scanner-page">
      <h1>🌾 Grain Scanner</h1>

      <p className="scanner-subtitle">
        Capture or upload a grain image
        for AI analysis.
      </p>

      <CameraCapture
        onCapture={handleNewImage}
      />

      <UploadImage
        onUpload={handleNewImage}
      />

      {image && (
        <>
          <img
            src={image}
            alt="Grain Preview"
            className="preview-image"
          />

          <ImageQuality
            image={image}
            onQualityDetected={
              setQualityInfo
            }
          />
        </>
      )}

      {qualityInfo && (
        <div
          className={`quality-card ${getQualityClass()}`}
        >
          <h3>
            Image Quality:
            {" "}
            {qualityInfo.quality}
          </h3>

          {qualityInfo.quality ===
            "Low" && (
            <p>
              Increase lighting,
              move closer and keep
              the camera steady.
            </p>
          )}

          {qualityInfo.quality ===
            "Medium" && (
            <p>
              Image is acceptable,
              but better lighting
              may improve accuracy.
            </p>
          )}

          {qualityInfo.quality ===
            "High" && (
            <p>
              Excellent image quality.
            </p>
          )}
        </div>
      )}

      {image && (
        <button
          className="btn-primary"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "Analyze Grain"}
        </button>
      )}

      {loading && (
        <div className="loading-box">
          🔍 AI is analyzing the grain...
        </div>
      )}

      {result && (
        <ScanResult
          grain={result}
        />
      )}
    </div>
  );
}