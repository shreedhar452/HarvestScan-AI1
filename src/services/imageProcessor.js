export async function analyzeImageQuality(imageSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      try {
        const canvas =
          document.createElement("canvas");

        const ctx =
          canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(
          img,
          0,
          0
        );

        const imageData =
          ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

        const pixels =
          imageData.data;

        let brightness = 0;

        const grayValues = [];

        // Brightness
        for (
          let i = 0;
          i < pixels.length;
          i += 4
        ) {
          const gray =
            (pixels[i] +
              pixels[i + 1] +
              pixels[i + 2]) /
            3;

          brightness += gray;

          grayValues.push(gray);
        }

        brightness /=
          grayValues.length;

        // Contrast
        let variance = 0;

        for (
          let i = 0;
          i < grayValues.length;
          i++
        ) {
          variance +=
            Math.pow(
              grayValues[i] -
                brightness,
              2
            );
        }

        variance /=
          grayValues.length;

        const contrast =
          Math.sqrt(variance);

        // Simple sharpness estimation
        let sharpness = 0;

        for (
          let i = 1;
          i < grayValues.length;
          i++
        ) {
          sharpness +=
            Math.abs(
              grayValues[i] -
                grayValues[i - 1]
            );
        }

        sharpness /=
          grayValues.length;

        let score = 0;

        // Brightness score
        if (
          brightness >= 80 &&
          brightness <= 220
        ) {
          score += 40;
        } else {
          score += 20;
        }

        // Contrast score
        if (contrast > 25) {
          score += 30;
        } else {
          score += 15;
        }

        // Sharpness score
        if (sharpness > 10) {
          score += 30;
        } else {
          score += 15;
        }

        let quality = "Low";

        if (score >= 80) {
          quality = "High";
        } else if (score >= 50) {
          quality = "Medium";
        }

        let recommendation =
          "Image quality is good.";

        if (quality === "Low") {
          recommendation =
            "Increase lighting and hold the camera steady.";
        }

        if (quality === "Medium") {
          recommendation =
            "Move closer to the grain for better accuracy.";
        }

        resolve({
          brightness:
            Math.round(
              brightness
            ),

          contrast:
            Number(
              contrast.toFixed(2)
            ),

          sharpness:
            Number(
              sharpness.toFixed(2)
            ),

          score,

          quality,

          recommendation,
        });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(
        new Error(
          "Failed to load image."
        )
      );
    };

    img.src = imageSrc;
  });
}