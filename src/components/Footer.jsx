import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {BOOKING_URL, contact, legalName, nav, social} from '../data/site';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='site-footer section--dark'>
      <div className='container'>
        <div className='site-footer__top'>
          <div className='site-footer__brand'>
            <img
              src='/img/logo-white.png'
              alt='AZ Listing Media'
              width='120'
              height='68'
              loading='lazy'
            />
            <p>Real estate photography, video and aerial media for the greater Phoenix area.</p>
            <a
              className='btn btn--accent'
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'>
              Book a shoot <ArrowUpRight size={18} aria-hidden='true' />
            </a>
          </div>

          <nav aria-label='Footer'>
            <h2 className='site-footer__title'>Explore</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className='site-footer__title'>Contact</h2>
            <ul>
              <li>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li>
                <a href={contact.emailHref}>{contact.email}</a>
              </li>
              <li>{contact.area}</li>
            </ul>
          </div>

          <div>
            <h2 className='site-footer__title'>Hours</h2>
            <ul>
              {contact.hours.map((h) => (
                <li key={h.label}>
                  <span className='site-footer__muted'>{h.label}</span>
                  <br />
                  {h.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='site-footer__bottom'>
          <p>
            © {year} {legalName}. All rights reserved.
          </p>
          <ul className='site-footer__social'>
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
