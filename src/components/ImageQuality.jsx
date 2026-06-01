import { useEffect, useState } from "react";
import { analyzeImageQuality } from "../services/imageProcessor";

export default function ImageQuality({
  image,
  onQualityDetected,
}) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    if (!image) return;

    let mounted = true;

    async function processImage() {
      try {
        setLoading(true);
        setError(null);

        const result =
          await analyzeImageQuality(
            image
          );

        if (
          mounted &&
          onQualityDetected
        ) {
          onQualityDetected(result);
        }
      } catch (err) {
        console.error(err);

        if (mounted) {
          setError(
            "Unable to analyze image quality."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    processImage();

    return () => {
      mounted = false;
    };
  }, [image, onQualityDetected]);

  if (loading) {
    return (
      <div className="quality-loading">
        🔍 Checking image quality...
      </div>
    );
  }

  if (error) {
    return (
      <div className="quality-error">
        {error}
      </div>
    );
  }

  return null;
}