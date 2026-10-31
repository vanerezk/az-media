import {Link} from 'react-router-dom';
import Seo from '../components/Seo';
import Picture from '../components/Picture';
import './pages.css';

export default function NotFound() {
  return (
    <>
      <Seo
        title='Page not found'
        description='This page does not exist.'
        noindex
      />
      <section className='not-found'>
        <Picture
          id='aerial-valley'
          className='not-found__bg'
          alt=''
          priority
        />
        <div className='container not-found__content'>
          <span className='eyebrow'>404</span>
          <h1>
            This page is <em>off the map.</em>
          </h1>
          <p>The link may be old or mistyped. Let&apos;s get you back on track.</p>
          <div className='not-found__actions'>
            <Link
              className='btn btn--accent'
              to='/'>
              Back to home
            </Link>
            <Link
              className='btn btn--ghost'
              to='/portfolio'>
              See our work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
