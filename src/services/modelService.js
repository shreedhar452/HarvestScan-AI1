import { extractFeatures } from "./classifier";
import { grainModel } from "./trainedModel";

function calculateConfidence(
  brightness,
  min,
  max
) {
  const center =
    (min + max) / 2;

  const distance =
    Math.abs(
      brightness - center
    );

  const maxDistance =
    (max - min) / 2;

  let confidence =
    100 -
    (distance /
      maxDistance) *
      20;

  confidence =
    Math.max(
      60,
      Math.min(
        99,
        Math.round(
          confidence
        )
      )
    );

  return confidence;
}

export async function predictGrain(
  image
) {
  try {

    const features =
      await extractFeatures(
        image
      );

    console.log(
      "Extracted Features:",
      features
    );

    // ----------------------------
    // Grain Validation Layer
    // ----------------------------

    const isLikelyGrain =

      features.texture > 3 &&

      features.brightness > 40 &&

      features.contrast > 15 &&

      features.saturation < 80;

    if (!isLikelyGrain) {

      return {
        name: "Not a Grain",

        confidence: 0,

        grade: "-",

        storage:
          "Please upload a valid grain image.",

        description:
          "The uploaded image does not appear to contain grains."
      };
    }

    // ----------------------------
    // Grain Classification
    // ----------------------------

    const grain =
      grainModel.find(
        (item) =>

          features.brightness >=
            item.brightnessMin &&

          features.brightness <=
            item.brightnessMax &&

          features.saturation >=
            item.saturationMin &&

          features.saturation <=
            item.saturationMax &&

          features.texture >=
            item.textureMin &&

          features.texture <=
            item.textureMax
      );

    // ----------------------------
    // Unknown Grain
    // ----------------------------

    if (!grain) {

      return {
        name: "Unknown Grain",

        confidence: 40,

        grade: "-",

        storage:
          "Capture image under better lighting.",

        description:
          "Unable to identify grain type."
      };
    }

    // ----------------------------
    // Confidence Calculation
    // ----------------------------

    const confidence =
      calculateConfidence(
        features.brightness,
        grain.brightnessMin,
        grain.brightnessMax
      );

    // ----------------------------
    // Final Result
    // ----------------------------

    return {
      name: grain.name,

      grade: grain.grade,

      storage:
        grain.storage,

      description:
        grain.description,

      confidence,
    };

  } catch (error) {

    console.error(
      "Prediction Error:",
      error
    );

    return {
      name: "Prediction Failed",

      confidence: 0,

      grade: "-",

      storage:
        "No recommendation",

      description:
        "Image analysis failed."
    };
  }
}