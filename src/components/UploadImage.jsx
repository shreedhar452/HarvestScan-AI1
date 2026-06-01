import { useState } from "react";

export default function UploadImage({ onUpload }) {
  const [fileName, setFileName] =
    useState("");

  function processFile(file) {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(file.type)
    ) {
      alert(
        "Please upload a JPG, PNG or WEBP image."
      );
      return;
    }

    const maxSize =
      10 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(
        "Image size must be less than 10 MB."
      );
      return;
    }

    setFileName(file.name);

    const reader =
      new FileReader();

    reader.onload = () => {
      onUpload(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function handleUpload(event) {
    const file =
      event.target.files?.[0];

    processFile(file);
  }

  function handleDrop(event) {
    event.preventDefault();

    const file =
      event.dataTransfer.files?.[0];

    processFile(file);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <div className="upload-container">

      <label
        className="upload-label"
      >
        📁 Upload Grain Image

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          hidden
        />
      </label>

      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drag & Drop Image Here
      </div>

      {fileName && (
        <div className="file-info">
          Selected File:
          {" "}
          <strong>
            {fileName}
          </strong>
        </div>
      )}
    </div>
  );
}