import {ArrowUpRight} from 'lucide-react';
import {BOOKING_URL, contact} from '../data/site';
import Picture from './Picture';
import Reveal from './Reveal';
import './CtaBand.css';

export default function CtaBand() {
  return (
    <section
      className='cta-band'
      aria-labelledby='cta-title'>
      <Picture
        id='twilight-cactus'
        className='cta-band__bg'
        alt=''
      />
      <div className='container cta-band__content'>
        <Reveal>
          <span className='eyebrow'>Let&apos;s get started</span>
          <h2 id='cta-title'>
            Your next listing, <em>at its best.</em>
          </h2>
          <p>Pick a time in our booking portal, or call us and we&apos;ll put together the right package.</p>
          <div className='cta-band__actions'>
            <a
              className='btn btn--accent'
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'>
              Book a shoot <ArrowUpRight size={18} aria-hidden='true' />
            </a>
            <a
              className='btn btn--ghost'
              href={contact.phoneHref}>
              Call {contact.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
