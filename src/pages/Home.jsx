import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Maximize2} from 'lucide-react';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import BeforeAfter from '../components/BeforeAfter';
import Lightbox from '../components/Lightbox';
import CtaBand from '../components/CtaBand';
import {featuredWork, process, services, testimonials} from '../data/content';
import './pages.css';

export default function Home() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <Seo
        description='Real estate photography, cinematic video, aerial drone media, twilight and floor plans for agents and builders across the greater Phoenix area. Book online.'
        path='/'
      />
      <Hero />

      {/* Services */}
      <section
        id='services'
        className='section'
        aria-labelledby='services-title'>
        <div className='container'>
          <div className='section-head section-head--split'>
            <div className='section-head'>
              <span className='eyebrow'>What we do</span>
              <h2 id='services-title'>
                A complete media solution for <em>every listing.</em>
              </h2>
            </div>
            <Link
              to='/pricing'
              className='link-arrow'>
              View all pricing <ArrowRight
                size={16}
                aria-hidden='true'
              />
            </Link>
          </div>

          <ul className='services'>
            {services.map((s, i) => (
              <Reveal
                as='li'
                key={s.id}
                delay={(i % 3) * 90}
                className='service'>
                <Link
                  to={s.anchor ? `/pricing#${s.anchor}` : '/contact'}
                  className='service__link'>
                  <Picture
                    id={s.image}
                    sizes='(min-width: 1100px) 400px, (min-width: 640px) 50vw, 100vw'
                    className='service__pic'
                    alt=''
                  />
                  <div className='service__body'>
                    <span className='service__num'>{String(i + 1).padStart(2, '0')}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <span className='service__from'>
                      {s.from}
                      <ArrowRight
                        size={16}
                        aria-hidden='true'
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected work */}
      <section
        className='section section--dark'
        aria-labelledby='work-title'>
        <div className='container'>
          <div className='section-head section-head--split'>
            <div className='section-head'>
              <span className='eyebrow'>Selected work</span>
              <h2 id='work-title'>
                Light, space and <em>a sense of place.</em>
              </h2>
            </div>
            <Link
              to='/portfolio'
              className='link-arrow'>
              Full portfolio <ArrowRight
                size={16}
                aria-hidden='true'
              />
            </Link>
          </div>

          <div className='work-grid'>
            {featuredWork.map((id, i) => (
              <Reveal
                key={id}
                delay={(i % 3) * 90}
                className={`work-grid__item work-grid__item--${i + 1}`}>
                <button
                  type='button'
                  className='zoomable'
                  onClick={() => setLightbox(i)}>
                  <Picture
                    id={id}
                    sizes='(min-width: 1100px) 640px, 100vw'
                  />
                  <span
                    className='zoomable__icon'
                    aria-hidden='true'>
                    <Maximize2 size={18} />
                  </span>
                  <span className='visually-hidden'>Open photo {i + 1} of {featuredWork.length}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
        <Lightbox
          items={featuredWork}
          index={lightbox}
          onChange={setLightbox}
          onClose={() => setLightbox(null)}
        />
      </section>

      {/* Virtual staging */}
      <section
        className='section'
        aria-labelledby='staging-title'>
        <div className='container staging'>
          <div className='section-head'>
            <span className='eyebrow'>Virtual staging</span>
            <h2 id='staging-title'>
              Empty rooms, <em>reimagined.</em>
            </h2>
            <p>
              Help buyers picture the life they could have there. Drag the slider to compare the empty room with the
              virtually staged version.
            </p>
            <Link
              to='/pricing#add-ons'
              className='link-arrow'>
              $49 per image <ArrowRight
                size={16}
                aria-hidden='true'
              />
            </Link>
          </div>
          <Reveal>
            <BeforeAfter
              before='staging-before'
              after='staging-after'
              label='Virtual staging comparison: drag to reveal the empty room'
            />
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section
        className='section section--alt'
        aria-labelledby='process-title'>
        <div className='container'>
          <div className='section-head'>
            <span className='eyebrow'>How it works</span>
            <h2 id='process-title'>
              Three steps from booking <em>to listed.</em>
            </h2>
          </div>
          <ol className='process'>
            {process.map((step, i) => (
              <Reveal
                as='li'
                key={step.title}
                delay={i * 110}
                className='process__step'>
                <span className='process__num'>{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* About */}
      <section
        className='section'
        aria-labelledby='about-title'>
        <div className='container about'>
          <Reveal className='about__media'>
            <Picture
              id='dining-luxury'
              sizes='(min-width: 900px) 50vw, 100vw'
              className='about__pic'
            />
          </Reveal>
          <div className='about__text'>
            <span className='eyebrow'>About us</span>
            <h2 id='about-title'>
              More than visuals. <em>A marketing partner.</em>
            </h2>
            <p>
              We work hand-in-hand with real estate agents, brokerages and developers to create strategic,
              high-impact media: photography, video tours and aerial imagery that help listings stand out in a
              competitive market.
            </p>
            <p>
              Our goal is simple: to be an extension of your team, with marketing that reflects the true essence of
              each property and strengthens your position as a top-tier professional.
            </p>
            <Link
              to='/contact'
              className='btn btn--dark'>
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section
          className='section section--alt'
          aria-labelledby='testimonials-title'>
          <div className='container'>
            <div className='section-head'>
              <span className='eyebrow'>Kind words</span>
              <h2 id='testimonials-title'>What agents say</h2>
            </div>
            <ul className='quotes'>
              {testimonials.map((t) => (
                <Reveal
                  as='li'
                  key={t.name}
                  className='quote'>
                  <blockquote>
                    <p>“{t.quote}”</p>
                  </blockquote>
                  <p className='quote__who'>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
