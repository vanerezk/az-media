import {useEffect, useRef} from 'react';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import Picture from './Picture';
import {imageAlt} from '../lib/images';
import './Lightbox.css';

/**
 * Accessible image viewer built on <dialog>: focus is trapped by the browser,
 * Esc closes, arrow keys move between photos.
 */
export default function Lightbox({items, index, onChange, onClose}) {
  const ref = useRef(null);
  const open = index !== null && index !== undefined;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, items.length, onChange]);

  const id = open ? items[index] : null;

  return (
    <dialog
      ref={ref}
      className='lightbox'
      aria-label='Photo viewer'
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}>
      {id && (
        <div className='lightbox__inner'>
          <button
            type='button'
            className='lightbox__btn lightbox__close'
            onClick={onClose}
            aria-label='Close'>
            <X aria-hidden='true' />
          </button>
          <figure
            key={id}
            className='lightbox__figure'>
            <Picture
              id={id}
              sizes='90vw'
              className='lightbox__pic'
            />
            <figcaption>
              <span>{imageAlt(id)}</span>
              <span className='lightbox__count'>
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
          {items.length > 1 && (
            <>
              <button
                type='button'
                className='lightbox__btn lightbox__prev'
                onClick={() => onChange((index - 1 + items.length) % items.length)}
                aria-label='Previous photo'>
                <ChevronLeft aria-hidden='true' />
              </button>
              <button
                type='button'
                className='lightbox__btn lightbox__next'
                onClick={() => onChange((index + 1) % items.length)}
                aria-label='Next photo'>
                <ChevronRight aria-hidden='true' />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
