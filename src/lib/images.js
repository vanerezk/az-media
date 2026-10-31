import images from '../data/images.json';

export {images};

export function imageAlt(id) {
  return images[id]?.alt ?? '';
}
