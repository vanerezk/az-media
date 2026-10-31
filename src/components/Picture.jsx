import {images} from '../lib/images';

const BASE = `${import.meta.env.BASE_URL}img`;

function srcSet(id, widths, ext) {
  return widths.map((w) => `${BASE}/${id}-${w}.${ext} ${w}w`).join(', ');
}

/**
 * Responsive AVIF/JPEG image from the generated manifest.
 * `priority` is for the one above-the-fold image per page.
 */
export default function Picture({id, sizes = '100vw', alt, className = '', imgClassName = '', priority = false, style}) {
  const img = images[id];
  if (!img) {
    if (import.meta.env.DEV) console.warn(`Picture: unknown image "${id}"`);
    return null;
  }
  const fallbackW = img.widths.find((w) => w >= 1280) ?? img.widths[img.widths.length - 1];

  return (
    <picture
      className={`pic ${className}`}
      style={{backgroundImage: `url(${img.lqip})`, ...style}}>
      <source
        type='image/avif'
        srcSet={srcSet(id, img.widths, 'avif')}
        sizes={sizes}
      />
      <img
        className={imgClassName}
        src={`${BASE}/${id}-${fallbackW}.jpg`}
        srcSet={srcSet(id, img.widths, 'jpg')}
        sizes={sizes}
        width={img.w}
        height={img.h}
        alt={alt ?? img.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
}
