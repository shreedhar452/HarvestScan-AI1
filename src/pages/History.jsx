import { useEffect, useState }
from "react";

import {
  getHistory
}
from "../services/storageService";

export default function History() {

  const [history,
    setHistory] =
    useState([]);

  useEffect(() => {

    const scans =
      getHistory();

    setHistory(scans);

  }, []);

  return (
    <div className="history-page">

      <h1>
        📜 Scan History
      </h1>

      {history.length === 0 && (
        <p>
          No scans available.
        </p>
      )}

      {history.map(
        (item, index) => (

          <div
            key={index}
            className="history-card"
          >

            <h3>
              {item.name}
            </h3>

            <p>
              Confidence:
              {" "}
              {item.confidence}%
            </p>

            <p>
              Grade:
              {" "}
              {item.grade}
            </p>

            <p>
              {new Date(
                item.timestamp
              ).toLocaleString()}
            </p>

          </div>

        )
      )}

    </div>
  );
}