import {ArrowUpRight, Clock, Mail, MapPin, Phone} from 'lucide-react';
import Seo from '../components/Seo';
import ContactForm from '../components/ContactForm';
import Faq from '../components/Faq';
import {BOOKING_URL, contact} from '../data/site';
import './pages.css';
import './Contact.css';

export default function Contact() {
  return (
    <>
      <Seo
        title='Contact'
        description='Contact AZ Listing Media for real estate photography, video and aerial media in Phoenix. Call 623-252-0066 or send us a message.'
        path='/contact'
      />

      <header className='page-head'>
        <div className='container'>
          <span className='eyebrow'>Contact</span>
          <h1>
            Let&apos;s talk about <em>your listing.</em>
          </h1>
          <p>
            Ready to book? Use our online portal. Have a question or a custom project? Send us a message and we&apos;ll
            get back to you.
          </p>
        </div>
      </header>

      <section
        className='contact'
        aria-label='Contact details and form'>
        <div className='container contact__grid'>
          <aside className='contact__info'>
            <a
              className='contact__book'
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'>
              <span>
                <strong>Book online</strong>
                <span>Choose services and a time in our booking portal.</span>
              </span>
              <ArrowUpRight aria-hidden='true' />
            </a>

            <ul className='contact__list'>
              <li>
                <Phone aria-hidden='true' />
                <div>
                  <span className='contact__label'>Phone</span>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </div>
              </li>
              <li>
                <Mail aria-hidden='true' />
                <div>
                  <span className='contact__label'>Email</span>
                  <a href={contact.emailHref}>{contact.email}</a>
                </div>
              </li>
              <li>
                <MapPin aria-hidden='true' />
                <div>
                  <span className='contact__label'>Service area</span>
                  <span>{contact.area}</span>
                </div>
              </li>
              <li>
                <Clock aria-hidden='true' />
                <div>
                  <span className='contact__label'>Business hours</span>
                  {contact.hours.map((h) => (
                    <span key={h.label}>
                      {h.label}: {h.value}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
          </aside>

          <ContactForm />
        </div>
      </section>

      <div className='section--alt'>
        <Faq />
      </div>
    </>
  );
}
