interface NoiseBackgroundParams {
  width?: number;
  height?: number;
  graininess?: number;
  contrast?: number;
  grainSize?: number;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  ellipseCount?: number;
  minRadius?: number;
  minDistance?: number;
  backgroundLightnessFactor?: number;
  grainLightnessFactor?: number;
  ellipseStartAlpha?: number;
  ellipseEndAlpha?: number;
  postContrast?: number;
  postBrightness?: number;
}

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function adjustColor([r, g, b]: RGB, factor = 0.5): RGB {
  return [Math.floor(r * factor), Math.floor(g * factor), Math.floor(b * factor)];
}

function blendColors(color1: RGB, color2: RGB, factor: number): RGB {
  return [
    Math.floor(color1[0] * (1 - factor) + color2[0] * factor),
    Math.floor(color1[1] * (1 - factor) + color2[1] * factor),
    Math.floor(color1[2] * (1 - factor) + color2[2] * factor),
  ];
}

function generateNoiseBackground({
  width = 400,
  height = 400,
  graininess = 1,
  contrast = 128,
  grainSize = 1,
  primaryColor = '#000000', // Default to black
  secondaryColor = '#FFFFFF', // Default to white
  tertiaryColor = '#808080', // Default to gray
  ellipseCount = 10, // Number of ellipses
  minRadius = 50, // Minimum radius of ellipses
  minDistance = 100, // Minimum distance between ellipses
  backgroundLightnessFactor = 0.5, // Factor to determine how much darker the background will be (0 to 1)
  grainLightnessFactor = 0.5, // Factor to determine how much darker the grain will be (0 to 1)
  ellipseStartAlpha = 1.0, // Alpha value for the start color of ellipses
  ellipseEndAlpha = 0.0, // Alpha value for the end color of ellipses
  postContrast = 100, // Post-processing contrast (percentage)
  postBrightness = 100, // Post-processing brightness (percentage)
}: NoiseBackgroundParams = {}): void {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context');
  }
  canvas.width = width;
  canvas.height = height;

  // Create a separate canvas for ellipses
  const ellipseCanvas = document.createElement('canvas');
  const ellipseCtx = ellipseCanvas.getContext('2d');
  if (!ellipseCtx) {
    throw new Error('Failed to get 2D context for ellipses');
  }
  ellipseCanvas.width = width;
  ellipseCanvas.height = height;

  // Convert hex colors to RGB
  const primaryRgb = hexToRgb(primaryColor);
  const secondaryRgb = hexToRgb(secondaryColor);
  const tertiaryRgb = hexToRgb(tertiaryColor);

  // Store ellipse colors and positions
  const ellipseColors: RGB[] = [];
  const ellipses: [number, number, number, number][] = [];

  // Prepare ellipse colors and positions
  for (let i = 0; i < ellipseCount; i++) {
    let x: number, y: number, rx: number, ry: number, tooClose: boolean;
    do {
      x = Math.random() * width;
      y = Math.random() * height;
      rx = minRadius + Math.random() * (width - minRadius);
      ry = minRadius + Math.random() * (height - minRadius);
      tooClose = ellipses.some(([ex, ey]) => {
        const dx = x - ex;
        const dy = y - ey;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDistance;
      });
    } while (tooClose);

    ellipses.push([x, y, rx, ry]);

    // Randomly choose between normal, lighter, and darkened colors
    const adjustFactor = Math.random() < 0.5 ? 0.9 : 1.6;
    const adjustedSecondary = adjustColor(secondaryRgb, adjustFactor);
    const adjustedTertiary = adjustColor(tertiaryRgb, adjustFactor);

    const startColor =
      Math.random() < 0.5
        ? primaryRgb
        : Math.random() < 0.5
          ? adjustedSecondary
          : adjustedTertiary;

    // Store the start color of the ellipse
    ellipseColors.push(startColor);
  }

  // Draw ellipses on the ellipse canvas
  ellipseCtx.filter = 'blur(40px)';
  ellipses.forEach(([x, y, rx, ry], index) => {
    const startColor = ellipseColors[index];
    const endColor = adjustColor(startColor, backgroundLightnessFactor);

    const gradient = ellipseCtx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
    const gradientColor = `rgba(${startColor.join(',')}, ${ellipseStartAlpha})`;

    gradient.addColorStop(0, gradientColor);
    gradient.addColorStop(1, `rgba(${endColor.join(',')}, ${ellipseEndAlpha})`);

    ellipseCtx.fillStyle = gradient;
    ellipseCtx.beginPath();
    ellipseCtx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
    ellipseCtx.fill();
  });

  // Get the ellipse image data
  const ellipseImageData = ellipseCtx.getImageData(0, 0, width, height);
  const ellipseBuffer = new Uint8ClampedArray(ellipseImageData.data.buffer);

  // Draw random noise on the main canvas
  const imageData = ctx.createImageData(width, height);
  const buffer = new Uint8ClampedArray(imageData.data.buffer);

  for (let y = 0; y < height; y += grainSize) {
    for (let x = 0; x < width; x += grainSize) {
      // Generate a random value around a middle gray value
      const baseValue = contrast;
      const variation = (Math.random() - 0.5) * graininess * 255;
      const value = Math.max(0, Math.min(255, baseValue + variation));

      // Get the ellipse color from the ellipse image
      const ellipseIndex = (y * width + x) * 4;
      const ellipseColor: RGB = [
        ellipseBuffer[ellipseIndex],
        ellipseBuffer[ellipseIndex + 1],
        ellipseBuffer[ellipseIndex + 2],
      ];

      const blendFactor = 0.5; // Fixed blend factor for equal blending
      const adjustedGrainColor = blendColors(
        adjustColor(ellipseColor, grainLightnessFactor),
        ellipseColor,
        blendFactor,
      );
      const adjustedBackgroundColor = blendColors(
        adjustColor(ellipseColor, backgroundLightnessFactor),
        ellipseColor,
        blendFactor,
      );

      for (let dy = 0; dy < grainSize; dy++) {
        for (let dx = 0; dx < grainSize; dx++) {
          const index = ((y + dy) * width + (x + dx)) * 4;
          if (value < 128) {
            buffer[index] = adjustedGrainColor[0]; // Red
            buffer[index + 1] = adjustedGrainColor[1]; // Green
            buffer[index + 2] = adjustedGrainColor[2]; // Blue
            buffer[index + 3] = 255; // Alpha
          } else {
            buffer[index] = adjustedBackgroundColor[0]; // Red
            buffer[index + 1] = adjustedBackgroundColor[1]; // Green
            buffer[index + 2] = adjustedBackgroundColor[2]; // Blue
            buffer[index + 3] = 255; // Alpha
          }
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Draw ellipses on the main canvas
  ctx.filter = 'blur(20px)';
  ellipses.forEach(([x, y, rx, ry], index) => {
    const startColor = ellipseColors[index];
    const endColor = adjustColor(startColor, backgroundLightnessFactor);

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
    const gradientColor = `rgba(${startColor.join(',')}, ${ellipseStartAlpha})`;

    gradient.addColorStop(0, gradientColor);
    gradient.addColorStop(1, `rgba(${endColor.join(',')}, ${ellipseEndAlpha})`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
    ctx.fill();
  });

  // Apply post-processing effects
  ctx.filter = `contrast(${postContrast}%) brightness(${postBrightness}%)`;
  ctx.drawImage(canvas, 0, 0);

  // Convert canvas to data URL and set as background
  const dataURL = canvas.toDataURL('image/png');
  document.body.style.background = `url(${dataURL})`;
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundSize = 'cover';
}

export { generateNoiseBackground };
