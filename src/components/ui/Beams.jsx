/* eslint-disable react/no-unknown-property */
import React from "react";
import Beams2D from "./Beams2D";

// Main Beams component - uses 2D version by default (original behavior)
const Beams = ({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = "#ffffff",
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 0,
}) => {
  return (
    <Beams2D
      beamWidth={beamWidth}
      beamHeight={beamHeight}
      beamNumber={beamNumber}
      lightColor={lightColor}
      speed={speed}
      noiseIntensity={noiseIntensity}
      scale={scale}
      rotation={rotation}
    />
  );
};

export default Beams;
