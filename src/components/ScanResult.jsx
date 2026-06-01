export default function ScanResult({ grain }) {

  if (!grain) return null;

  // ----------------------------
  // Invalid Image
  // ----------------------------

  if (
    grain.name ===
    "Not a Grain"
  ) {
    return (
      <div className="result-card">

        <h2>
          ❌ Invalid Image
        </h2>

        <p>
          Please upload a valid
          grain image.
        </p>

        <p>
          Supported grains:
        </p>

        <ul>
          <li>Basmati Rice</li>
          <li>Wheat</li>
          <li>Corn</li>
          <li>Barley</li>
          <li>Quinoa</li>
        </ul>

      </div>
    );
  }

  // ----------------------------
  // Unknown Grain
  // ----------------------------

  if (
    grain.name ===
    "Unknown Grain"
  ) {
    return (
      <div className="result-card">

        <h2>
          ⚠ Unknown Grain
        </h2>

        <p>
          Unable to identify the
          uploaded grain.
        </p>

        <p>
          Try:
        </p>

        <ul>
          <li>Better lighting</li>
          <li>Closer image</li>
          <li>Clear grain visibility</li>
        </ul>

      </div>
    );
  }

  // ----------------------------
  // Normal Result
  // ----------------------------

  const confidenceColor =
    grain.confidence >= 90
      ? "#2e7d32"
      : grain.confidence >= 70
      ? "#f57c00"
      : "#d32f2f";

  return (
    <div className="result-card">

      <div className="result-header">
        <h2>
          🌾 Grain Analysis Result
        </h2>
      </div>

      <div className="result-section">

        <div className="result-item">

          <span className="label">
            Grain Type
          </span>

          <span className="value">
            {grain.name}
          </span>

        </div>

        <div className="result-item">

          <span className="label">
            Confidence
          </span>

          <span
            className="value"
            style={{
              color: confidenceColor
            }}
          >
            {grain.confidence}%
          </span>

        </div>

        <div className="result-item">

          <span className="label">
            Quality Grade
          </span>

          <span className="value">
            {grain.grade}
          </span>

        </div>

        <div className="result-item">

          <span className="label">
            Storage Advice
          </span>

          <span className="value">
            {grain.storage}
          </span>

        </div>

      </div>

      <div className="prediction-status">

        {grain.confidence >= 90 && (
          <div className="success">
            ✅ High Confidence Prediction
          </div>
        )}

        {grain.confidence >= 70 &&
          grain.confidence < 90 && (
            <div className="warning">
              ⚠ Medium Confidence
            </div>
          )}

        {grain.confidence < 70 && (
          <div className="danger">
            ❌ Low Confidence
          </div>
        )}

      </div>

      <div className="farmer-tip">

        💡 Tip:
        Capture images under good
        lighting for better accuracy.

      </div>

    </div>
  );
}