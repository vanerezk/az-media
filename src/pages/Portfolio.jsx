import {useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Maximize2} from 'lucide-react';
import Seo from '../components/Seo';
import Picture from '../components/Picture';
import {images} from '../lib/images';
import Lightbox from '../components/Lightbox';
import CtaBand from '../components/CtaBand';
import './pages.css';
import './Portfolio.css';

const filters = [
  {id: 'all', label: 'All'},
  {id: 'interiors', label: 'Interiors'},
  {id: 'exteriors', label: 'Exteriors'},
  {id: 'twilight', label: 'Twilight'},
  {id: 'aerial', label: 'Aerial'},
  {id: 'staging', label: 'Virtual staging'},
];

const allIds = Object.keys(images).filter((id) => images[id].cat);

export default function Portfolio() {
  const [params, setParams] = useSearchParams();
  const active = filters.some((f) => f.id === params.get('c')) ? params.get('c') : 'all';
  const [lightbox, setLightbox] = useState(null);

  const items = useMemo(
    () => (active === 'all' ? allIds : allIds.filter((id) => images[id].cat === active)),
    [active]
  );

  const select = (id) => {
    setLightbox(null);
    setParams(id === 'all' ? {} : {c: id}, {replace: true, preventScrollReset: true});
  };

  return (
    <>
      <Seo
        title='Portfolio'
        description='Real estate photography, twilight, aerial drone and virtual staging work from homes across the greater Phoenix area.'
        path='/portfolio'
      />

      <header className='page-head'>
        <div className='container'>
          <span className='eyebrow'>Portfolio</span>
          <h1>
            Homes, seen <em>at their best.</em>
          </h1>
          <p>A selection of recent work from across the Valley. Tap any photo to view it full size.</p>
        </div>
      </header>

      <section
        className='portfolio'
        aria-label='Photo gallery'>
        <div className='container'>
          <div
            className='filters'
            role='group'
            aria-label='Filter photos'>
            {filters.map((f) => (
              <button
                key={f.id}
                type='button'
                aria-pressed={active === f.id}
                onClick={() => select(f.id)}>
                {f.label}
              </button>
            ))}
            <span
              className='filters__count'
              role='status'>
              {items.length} photos
            </span>
          </div>

          <ul
            className='masonry'
            key={active}>
            {items.map((id, i) => (
              <li
                key={id}
                className='masonry__item'
                style={{'--i': Math.min(i, 12)}}>
                <button
                  type='button'
                  className='zoomable'
                  onClick={() => setLightbox(i)}>
                  <Picture
                    id={id}
                    sizes='(min-width: 1100px) 420px, (min-width: 640px) 50vw, 100vw'
                  />
                  <span
                    className='zoomable__icon'
                    aria-hidden='true'>
                    <Maximize2 size={18} />
                  </span>
                  <span className='visually-hidden'>Open full size</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Lightbox
          items={items}
          index={lightbox}
          onChange={setLightbox}
          onClose={() => setLightbox(null)}
        />
      </section>

      <CtaBand />
    </>
  );
}
