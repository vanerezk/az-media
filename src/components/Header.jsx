import {useEffect, useRef, useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {Menu, X, ArrowUpRight} from 'lucide-react';
import {BOOKING_URL, contact, nav} from '../data/site';
import './Header.css';

// In-page links (/#services) should never look "active".
function NavItem({to, children}) {
  return to.includes('#') ? <Link to={to}>{children}</Link> : <NavLink to={to}>{children}</NavLink>;
}

export default function Header() {
  const {pathname} = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const overlay = isHome && !scrolled && !open;

  return (
    <header className={`site-header ${overlay ? 'is-overlay' : 'is-solid'} ${scrolled ? 'is-scrolled' : ''}`}>
      <div className='container site-header__inner'>
        <Link
          to='/'
          className='site-header__logo'
          aria-label='AZ Listing Media, home'>
          <img
            src={overlay ? '/img/logo-white.png' : '/img/logo-black.png'}
            alt=''
            width='120'
            height='68'
          />
        </Link>

        <nav
          className='site-nav'
          aria-label='Main'>
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <NavItem to={item.to}>{item.label}</NavItem>
              </li>
            ))}
          </ul>
        </nav>

        <div className='site-header__actions'>
          <a
            className='site-header__phone'
            href={contact.phoneHref}>
            {contact.phone}
          </a>
          <a
            className='btn btn--accent btn--sm'
            href={BOOKING_URL}
            target='_blank'
            rel='noopener noreferrer'>
            Book a shoot
          </a>
          <button
            ref={toggleRef}
            type='button'
            className='menu-toggle'
            aria-expanded={open}
            aria-controls='mobile-menu'
            onClick={() => setOpen((v) => !v)}>
            {open ? <X aria-hidden='true' /> : <Menu aria-hidden='true' />}
            <span className='visually-hidden'>{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <div
        id='mobile-menu'
        ref={menuRef}
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        hidden={!open}
        onClick={(e) => {
          if (e.target.closest('a')) setOpen(false);
        }}>
        <nav aria-label='Mobile'>
          <ul>
            {nav.map((item, i) => (
              <li
                key={item.to}
                style={{'--i': i}}>
                <NavItem to={item.to}>{item.label}</NavItem>
              </li>
            ))}
          </ul>
        </nav>
        <div className='mobile-menu__footer'>
          <a
            className='btn btn--accent'
            href={BOOKING_URL}
            target='_blank'
            rel='noopener noreferrer'>
            Book a shoot <ArrowUpRight size={18} aria-hidden='true' />
          </a>
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={contact.emailHref}>{contact.email}</a>
        </div>
      </div>
    </header>
  );
}
