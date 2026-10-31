import {useRef, useState} from 'react';
import {CheckCircle2, Loader2} from 'lucide-react';
import {contact} from '../data/site';
import './ContactForm.css';

// Netlify Forms: a matching hidden form lives in index.html so Netlify
// detects the fields at deploy time. Field names must stay in sync.
const FORM_NAME = 'contact';

const services = [
  'Photography',
  'Video',
  'Aerial',
  'Twilight / virtual twilight',
  'Virtual staging',
  'Floor plans',
  'Agent branding',
  'Not sure yet',
];

const validators = {
  name: (v) => (v.trim() ? '' : 'Please enter your name.'),
  email: (v) =>
    !v.trim() ? 'Please enter your email.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter an email like name@example.com.',
  message: (v) => (v.trim().length >= 10 ? '' : 'Tell us a little about the project (at least 10 characters).'),
};

function encode(data) {
  return new URLSearchParams(data).toString();
}

export default function ContactForm() {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validateField = (name, value) => {
    const fn = validators[name];
    if (!fn) return '';
    const msg = fn(value);
    setErrors((e) => ({...e, [name]: msg}));
    return msg;
  };

  const onBlur = (e) => {
    if (validators[e.target.name]) validateField(e.target.name, e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const data = Object.fromEntries(new FormData(form));

    const next = {};
    for (const key of Object.keys(validators)) next[key] = validators[key](data[key] ?? '');
    setErrors(next);
    const firstInvalid = Object.keys(next).find((k) => next[k]);
    if (firstInvalid) {
      form.elements[firstInvalid].focus();
      return;
    }

    setStatus('sending');
    try {
      if (import.meta.env.DEV) {
        await new Promise((r) => setTimeout(r, 700));
      } else {
        const res = await fetch('/', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: encode({'form-name': FORM_NAME, ...data}),
        });
        if (!res.ok) throw new Error(res.statusText);
      }
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className='form-success'
        role='status'
        tabIndex={-1}
        ref={(el) => el?.focus()}>
        <CheckCircle2 aria-hidden='true' />
        <h2>Thanks, message received.</h2>
        <p>We&apos;ll get back to you within business hours. Need it sooner? Call {contact.phone}.</p>
        <button
          type='button'
          className='btn btn--ghost'
          onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  const field = (name) => ({
    name,
    id: `f-${name}`,
    onBlur,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `f-${name}-err` : undefined,
  });

  const errorFor = (name) =>
    errors[name] ? (
      <p
        id={`f-${name}-err`}
        className='field__error'>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      className='contact-form'
      name={FORM_NAME}
      method='POST'
      data-netlify='true'
      netlify-honeypot='bot-field'
      noValidate
      onSubmit={onSubmit}>
      <h2 className='contact-form__title'>Send us a message</h2>
      <input
        type='hidden'
        name='form-name'
        value={FORM_NAME}
      />
      <p
        className='visually-hidden'
        aria-hidden='true'>
        <label>
          Leave this empty: <input
            name='bot-field'
            tabIndex={-1}
            autoComplete='off'
          />
        </label>
      </p>

      <div className='contact-form__row'>
        <div className='field'>
          <label htmlFor='f-name'>
            Name <span aria-hidden='true'>*</span>
          </label>
          <input
            {...field('name')}
            type='text'
            autoComplete='name'
            required
          />
          {errorFor('name')}
        </div>
        <div className='field'>
          <label htmlFor='f-email'>
            Email <span aria-hidden='true'>*</span>
          </label>
          <input
            {...field('email')}
            type='email'
            autoComplete='email'
            inputMode='email'
            required
          />
          {errorFor('email')}
        </div>
      </div>

      <div className='contact-form__row'>
        <div className='field'>
          <label htmlFor='f-phone'>Phone</label>
          <input
            {...field('phone')}
            type='tel'
            autoComplete='tel'
          />
        </div>
        <div className='field'>
          <label htmlFor='f-service'>Service</label>
          <select
            {...field('service')}
            defaultValue=''>
            <option
              value=''
              disabled>
              Choose one
            </option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='field'>
        <label htmlFor='f-address'>Property address</label>
        <input
          {...field('address')}
          type='text'
          autoComplete='street-address'
        />
        <p className='field__hint'>Optional. Helps us quote the right package.</p>
      </div>

      <div className='field'>
        <label htmlFor='f-message'>
          Message <span aria-hidden='true'>*</span>
        </label>
        <textarea
          {...field('message')}
          rows={5}
          required
        />
        {errorFor('message')}
      </div>

      {status === 'error' && (
        <p
          className='form-error'
          role='alert'>
          Something went wrong sending your message. Please try again, or email us at{' '}
          <a href={contact.emailHref}>{contact.email}</a>.
        </p>
      )}

      <div className='contact-form__footer'>
        <button
          type='submit'
          className='btn btn--dark'
          disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2
                className='spin'
                size={18}
                aria-hidden='true'
              />{' '}
              Sending…
            </>
          ) : (
            'Send message'
          )}
        </button>
        <p className='field__hint'>
          <span aria-hidden='true'>*</span> Required
        </p>
      </div>
    </form>
  );
}
