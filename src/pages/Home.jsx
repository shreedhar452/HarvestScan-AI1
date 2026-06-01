import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">

      <div className="hero-card">

        <h1>
          🌾 CeresScan AI
        </h1>

        <p>
          Smart Grain Identification System
        </p>

        <p>
          Take a photo of grains and get
          instant AI-based identification,
          quality analysis, and storage advice.
        </p>

        <Link
          to="/scanner"
          className="btn-primary"
        >
          📷 Start Scanning
        </Link>

      </div>

      <div className="feature-grid">

        <div className="feature-card">
          🌾
          <h3>Grain Detection</h3>
          <p>
            Identify rice, wheat,
            corn, barley and more.
          </p>
        </div>

        <div className="feature-card">
          📊
          <h3>Quality Analysis</h3>
          <p>
            Detect image quality and
            confidence score.
          </p>
        </div>

        <div className="feature-card">
          📜
          <h3>History</h3>
          <p>
            Save previous scans
            for future reference.
          </p>
        </div>

      </div>

    </div>
  );
}