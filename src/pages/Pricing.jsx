import {ArrowUpRight} from 'lucide-react';
import Seo from '../components/Seo';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import YouTube from '../components/YouTube';
import Faq from '../components/Faq';
import CtaBand from '../components/CtaBand';
import {BOOKING_URL} from '../data/site';
import {addOns, pricing} from '../data/pricing';
import './pages.css';
import './Pricing.css';

function PriceTable({caption, columns, rows}) {
  return (
    <table className='price-table'>
      <caption className='visually-hidden'>{caption}</caption>
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={c}
              scope='col'>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, price]) => (
          <tr key={label}>
            <th scope='row'>{label}</th>
            <td>{price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Notes({notes}) {
  if (!notes?.length) return null;
  return (
    <ul className='price-notes'>
      {notes.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}

function BookButton() {
  return (
    <a
      className='btn btn--dark'
      href={BOOKING_URL}
      target='_blank'
      rel='noopener noreferrer'>
      Book now <ArrowUpRight size={18} aria-hidden='true' />
    </a>
  );
}

export default function Pricing() {
  return (
    <>
      <Seo
        title='Pricing'
        description='Transparent pricing for real estate photography, video, aerial drone, floor plans, twilight and virtual staging in the Phoenix area.'
        path='/pricing'
      />

      <header className='page-head'>
        <div className='container'>
          <span className='eyebrow'>Pricing</span>
          <h1>
            Clear pricing, <em>no surprises.</em>
          </h1>
          <p>Packages are priced by property size. Mix and match services, then book online in a couple of minutes.</p>
          <nav
            className='price-nav'
            aria-label='Pricing sections'>
            {pricing.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}>
                {p.title}
              </a>
            ))}
            <a href='#add-ons'>Add-ons</a>
          </nav>
        </div>
      </header>

      {pricing.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`section price-section ${i % 2 ? 'section--alt' : ''}`}
          aria-labelledby={`${p.id}-title`}>
          <div className='container price-section__grid'>
            <div className='price-section__intro'>
              <span className='eyebrow'>{String(i + 1).padStart(2, '0')}</span>
              <h2 id={`${p.id}-title`}>{p.title}</h2>
              <p>{p.lead}</p>
              <Reveal>
                <Picture
                  id={p.image}
                  sizes='(min-width: 900px) 40vw, 100vw'
                  className='price-section__pic'
                  alt=''
                />
              </Reveal>
            </div>

            <div className='price-section__body'>
              {p.rows && (
                <Reveal className='price-card'>
                  <PriceTable
                    caption={`${p.title} prices`}
                    columns={p.columns}
                    rows={p.rows}
                  />
                  <Notes notes={p.notes} />
                  <BookButton />
                </Reveal>
              )}

              {p.groups?.map((g) => (
                <Reveal
                  key={g.title}
                  className='price-card'>
                  <h3>{g.title}</h3>
                  <p className='price-card__text'>{g.text}</p>
                  {g.youtube && (
                    <YouTube
                      id={g.youtube.id}
                      title={g.youtube.title}
                    />
                  )}
                  <PriceTable
                    caption={`${g.title} prices`}
                    columns={g.columns}
                    rows={g.rows}
                  />
                  <Notes notes={g.notes} />
                  <BookButton />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section
        id='add-ons'
        className='section section--dark'
        aria-labelledby='addons-title'>
        <div className='container'>
          <div className='section-head'>
            <span className='eyebrow'>Add-ons</span>
            <h2 id='addons-title'>
              Boost your listing&apos;s <em>visibility.</em>
            </h2>
            <p>Add any of these to a photo package. Ask us about anything you don&apos;t see here.</p>
          </div>
          <ul className='addons'>
            {addOns.map((a, i) => (
              <Reveal
                as='li'
                key={a.title}
                delay={(i % 5) * 70}
                className='addon'>
                <Picture
                  id={a.image}
                  sizes='(min-width: 1100px) 250px, (min-width: 600px) 33vw, 50vw'
                  className='addon__pic'
                  alt=''
                />
                <h3>{a.title}</h3>
                <p>{a.price}</p>
              </Reveal>
            ))}
          </ul>
          <p className='addons__tax'>Prices do not include tax.</p>
        </div>
      </section>

      <Faq title='Before you book' />
      <CtaBand />
    </>
  );
}
