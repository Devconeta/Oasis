import { toHex } from './toHex';

export const generateSoftColor = (): string => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 40) + 30;
  const lightness = Math.floor(Math.random() * 20) + 70;

  const chroma = ((1 - Math.abs((2 * lightness) / 100 - 1)) * saturation) / 100;
  const huePrime = hue / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  const m = lightness / 100 - chroma / 2;

  let r, g, b;
  if (huePrime >= 0 && huePrime < 1) {
    [r, g, b] = [chroma, x, 0];
  } else if (huePrime >= 1 && huePrime < 2) {
    [r, g, b] = [x, chroma, 0];
  } else if (huePrime >= 2 && huePrime < 3) {
    [r, g, b] = [0, chroma, x];
  } else if (huePrime >= 3 && huePrime < 4) {
    [r, g, b] = [0, x, chroma];
  } else if (huePrime >= 4 && huePrime < 5) {
    [r, g, b] = [x, 0, chroma];
  } else {
    [r, g, b] = [chroma, 0, x];
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};
