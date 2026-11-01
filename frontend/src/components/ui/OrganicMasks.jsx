import React from 'react';

/**
 * Responsive SVG Organic Clip Paths using objectBoundingBox (0.0 to 1.0 coordinates)
 * Allows any container/image to adapt to dynamic viewport sizes without losing
 * its artisanal sculpted silhouette.
 */
const OrganicMasks = () => {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <defs>
        {/* Main Master Organic Hero Mask (Matches Reference Silhouette) */}
        <clipPath id="organic-hero-mask" clipPathUnits="objectBoundingBox">
          <path d="
            M 0.12,0.08
            C 0.28,0.01 0.55,0.06 0.72,0.03
            C 0.88,0.01 0.96,0.12 0.98,0.28
            C 1.00,0.42 0.94,0.60 0.97,0.76
            C 0.99,0.92 0.88,0.98 0.74,0.97
            C 0.58,0.96 0.38,1.00 0.22,0.98
            C 0.08,0.96 0.02,0.85 0.02,0.68
            C 0.01,0.52 0.05,0.36 0.03,0.22
            C 0.01,0.12 0.04,0.09 0.12,0.08 Z
          " />
        </clipPath>

        {/* Secondary Organic Weather / Pebble Bubble Mask */}
        <clipPath id="organic-bubble-mask" clipPathUnits="objectBoundingBox">
          <path d="
            M 0.25,0.06
            C 0.55,-0.02 0.82,0.08 0.94,0.32
            C 1.04,0.54 0.96,0.82 0.76,0.94
            C 0.52,1.04 0.24,0.98 0.10,0.78
            C -0.02,0.56 0.02,0.22 0.25,0.06 Z
          " />
        </clipPath>

        {/* Gentle Fluid Landscape Card Mask */}
        <clipPath id="organic-card-mask" clipPathUnits="objectBoundingBox">
          <path d="
            M 0.06,0.10
            C 0.25,0.02 0.65,0.05 0.88,0.03
            C 0.98,0.02 1.00,0.16 0.99,0.42
            C 0.98,0.72 0.99,0.92 0.86,0.97
            C 0.66,1.02 0.32,0.96 0.14,0.98
            C 0.03,0.99 0.01,0.88 0.01,0.65
            C 0.01,0.42 0.00,0.22 0.06,0.10 Z
          " />
        </clipPath>
      </defs>
    </svg>
  );
};

export default OrganicMasks;
