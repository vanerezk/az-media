import {Plus} from 'lucide-react';
import {faq} from '../data/faq';
import Reveal from './Reveal';
import './Faq.css';

export default function Faq({title = 'Questions, answered'}) {
  return (
    <section
      className='section'
      aria-labelledby='faq-title'>
      <div className='container faq'>
        <div className='section-head'>
          <span className='eyebrow'>FAQ</span>
          <h2 id='faq-title'>{title}</h2>
        </div>
        <Reveal className='faq__list'>
          {faq.map((item) => (
            <details
              key={item.q}
              className='faq__item'>
              <summary>
                <span>{item.q}</span>
                <Plus
                  aria-hidden='true'
                  className='faq__icon'
                />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
