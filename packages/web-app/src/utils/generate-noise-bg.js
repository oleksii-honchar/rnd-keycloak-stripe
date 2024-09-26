function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function adjustColor([r, g, b], factor = 0.5) {
  return [Math.floor(r * factor), Math.floor(g * factor), Math.floor(b * factor)];
}

function blendColors(color1, color2, factor) {
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
  primaryColor = '#000000',
  secondaryColor = '#FFFFFF',
  tertiaryColor = '#808080',
  ellipseCount = 10,
  minRadius = 50,
  minDistance = 100,
  backgroundLightnessFactor = 0.5,
  grainLightnessFactor = 0.5,
  ellipseStartAlpha = 1.0,
  ellipseEndAlpha = 0.0,
  postContrast = 100,
  postBrightness = 100,
} = {}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context');
  }
  canvas.width = width;
  canvas.height = height;

  const ellipseCanvas = document.createElement('canvas');
  const ellipseCtx = ellipseCanvas.getContext('2d');
  if (!ellipseCtx) {
    throw new Error('Failed to get 2D context for ellipses');
  }
  ellipseCanvas.width = width;
  ellipseCanvas.height = height;

  const primaryRgb = hexToRgb(primaryColor);
  const secondaryRgb = hexToRgb(secondaryColor);
  const tertiaryRgb = hexToRgb(tertiaryColor);

  const ellipseColors = [];
  const ellipses = [];

  for (let i = 0; i < ellipseCount; i++) {
    let x, y, rx, ry, tooClose;
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

    const adjustFactor = Math.random() < 0.5 ? 0.9 : 1.6;
    const adjustedSecondary = adjustColor(secondaryRgb, adjustFactor);
    const adjustedTertiary = adjustColor(tertiaryRgb, adjustFactor);

    const startColor =
      Math.random() < 0.5
        ? primaryRgb
        : Math.random() < 0.5
          ? adjustedSecondary
          : adjustedTertiary;

    ellipseColors.push(startColor);
  }

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

  const ellipseImageData = ellipseCtx.getImageData(0, 0, width, height);
  const ellipseBuffer = new Uint8ClampedArray(ellipseImageData.data.buffer);

  const imageData = ctx.createImageData(width, height);
  const buffer = new Uint8ClampedArray(imageData.data.buffer);

  for (let y = 0; y < height; y += grainSize) {
    for (let x = 0; x < width; x += grainSize) {
      const baseValue = contrast;
      const variation = (Math.random() - 0.5) * graininess * 255;
      const value = Math.max(0, Math.min(255, baseValue + variation));

      const ellipseIndex = (y * width + x) * 4;
      const ellipseColor = [
        ellipseBuffer[ellipseIndex],
        ellipseBuffer[ellipseIndex + 1],
        ellipseBuffer[ellipseIndex + 2],
      ];

      const blendFactor = 0.5;
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
            buffer[index] = adjustedGrainColor[0];
            buffer[index + 1] = adjustedGrainColor[1];
            buffer[index + 2] = adjustedGrainColor[2];
            buffer[index + 3] = 255;
          } else {
            buffer[index] = adjustedBackgroundColor[0];
            buffer[index + 1] = adjustedBackgroundColor[1];
            buffer[index + 2] = adjustedBackgroundColor[2];
            buffer[index + 3] = 255;
          }
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

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

  ctx.filter = `contrast(${postContrast}%) brightness(${postBrightness}%)`;
  ctx.drawImage(canvas, 0, 0);

  const dataURL = canvas.toDataURL('image/png');
  document.body.style.background = `url(${dataURL})`;
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundSize = 'cover';

  return dataURL;
}

function generate() {
  const dataURL = generateNoiseBackground({
    width: 1600,
    height: 1600,
    graininess: 0.6,
    contrast: 100,
    grainSize: 1,
    primaryColor: '#576500',
    secondaryColor: '#146d2f',
    tertiaryColor: '#9a3f61',
    ellipseCount: 5,
    minRadius: 150,
    minDistance: 100,
    backgroundLightnessFactor: 0.7,
    grainLightnessFactor: 1.5,
    ellipseStartAlpha: 0.7,
    ellipseEndAlpha: 0.0,
    postContrast: 90,
    postBrightness: 100,
  });

  const downloadLink = document.getElementById('download-link');
  downloadLink.href = dataURL;
  downloadLink.download = 'noise-background.png';
  downloadLink.style.display = 'block';
}
