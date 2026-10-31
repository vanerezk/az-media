import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight, Pause, Play} from 'lucide-react';
import {BOOKING_URL} from '../data/site';
import {heroSlides} from '../data/content';
import Picture from './Picture';
import './Hero.css';

const INTERVAL = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  // Only the first slide competes with the page's first paint; the rest load after.
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoadRest(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!playing || !loadRest) return;
    const t = setInterval(() => setActive((i) => (i + 1) % heroSlides.length), INTERVAL);
    return () => clearInterval(t);
  }, [playing, loadRest]);

  return (
    <section
      className='hero'
      aria-labelledby='hero-title'>
      <div
        className='hero__slides'
        aria-hidden='true'>
        {heroSlides.map((s, i) =>
          i === 0 || loadRest ? (
            <div
              key={s.image}
              className={`hero__slide ${i === active ? 'is-active' : ''} ${playing ? '' : 'is-paused'}`}>
              <Picture
                id={s.image}
                alt=''
                priority={i === 0}
                className='hero__pic'
              />
            </div>
          ) : null
        )}
      </div>

      <div className='container hero__content'>
        <p className='hero__eyebrow'>Real estate media · Greater Phoenix</p>
        <h1 id='hero-title'>
          Real estate media that sells <em>the lifestyle.</em>
        </h1>
        <p className='hero__lead'>
          Photography, cinematic video, aerial and floor plans for agents, brokerages and builders across the
          Valley.
        </p>
        <div className='hero__actions'>
          <a
            className='btn btn--accent'
            href={BOOKING_URL}
            target='_blank'
            rel='noopener noreferrer'>
            Book a shoot <ArrowUpRight size={18} aria-hidden='true' />
          </a>
          <Link
            className='btn btn--ghost'
            to='/pricing'>
            See pricing
          </Link>
        </div>
      </div>

      <div className='container hero__meta'>
        <div className='hero__dots'>
          {heroSlides.map((s, i) => (
            <button
              key={s.image}
              type='button'
              className={i === active ? 'is-active' : ''}
              aria-label={`Show slide ${i + 1}: ${s.label}`}
              aria-current={i === active}
              onClick={() => {
                setLoadRest(true);
                setActive(i);
              }}>
              <span />
            </button>
          ))}
          <span
            className='hero__label'
            aria-live='off'>
            {String(active + 1).padStart(2, '0')} — {heroSlides[active].label}
          </span>
        </div>
        <button
          type='button'
          className='hero__pause'
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>
          {playing ? (
            <Pause
              size={16}
              aria-hidden='true'
            />
          ) : (
            <Play
              size={16}
              aria-hidden='true'
            />
          )}
        </button>
      </div>
    </section>
  );
}
