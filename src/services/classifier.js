export async function extractFeatures(imageSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      try {
        const canvas =
          document.createElement("canvas");

        const ctx =
          canvas.getContext("2d");

        canvas.width = 224;
        canvas.height = 224;

        ctx.drawImage(
          img,
          0,
          0,
          224,
          224
        );

        const imageData =
          ctx.getImageData(
            0,
            0,
            224,
            224
          );

        const pixels =
          imageData.data;

        let red = 0;
        let green = 0;
        let blue = 0;

        let brightness = 0;

        const grayValues = [];

        for (
          let i = 0;
          i < pixels.length;
          i += 4
        ) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          red += r;
          green += g;
          blue += b;

          const gray =
            (r + g + b) / 3;

          brightness += gray;

          grayValues.push(gray);
        }

        const totalPixels =
          pixels.length / 4;

        red /= totalPixels;
        green /= totalPixels;
        blue /= totalPixels;

        brightness /= totalPixels;

        // Contrast (standard deviation)
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

        variance /= grayValues.length;

        const contrast =
          Math.sqrt(variance);

        // Saturation estimate
        const maxRGB =
          Math.max(
            red,
            green,
            blue
          );

        const minRGB =
          Math.min(
            red,
            green,
            blue
          );

        const saturation =
          maxRGB === 0
            ? 0
            : (
                (maxRGB -
                  minRGB) /
                maxRGB
              ) *
              100;

        // Simple texture score
        let texture = 0;

        for (
          let i = 1;
          i < grayValues.length;
          i++
        ) {
          texture +=
            Math.abs(
              grayValues[i] -
                grayValues[i - 1]
            );
        }

        texture /=
          grayValues.length;

        resolve({
          brightness:
            Number(
              brightness.toFixed(2)
            ),

          red:
            Number(
              red.toFixed(2)
            ),

          green:
            Number(
              green.toFixed(2)
            ),

          blue:
            Number(
              blue.toFixed(2)
            ),

          contrast:
            Number(
              contrast.toFixed(2)
            ),

          saturation:
            Number(
              saturation.toFixed(2)
            ),

          texture:
            Number(
              texture.toFixed(2)
            ),
        });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(
        new Error(
          "Failed to load image"
        )
      );
    };

    img.src = imageSrc;
  });
}