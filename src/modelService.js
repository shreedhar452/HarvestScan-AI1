import { grains } from "../data/grains";

export async function predictGrain() {

  const random =
    grains[
      Math.floor(
        Math.random() *
          grains.length
      )
    ];

  return {
    ...random,
    confidence:
      Math.floor(
        Math.random() * 15
      ) + 85
  };
}