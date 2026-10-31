import {useId, useState} from 'react';
import Picture from './Picture';
import './BeforeAfter.css';

// Comparison slider driven by a native range input, so it works with
// keyboard, touch and screen readers without custom drag code.
export default function BeforeAfter({before, after, label = 'Before and after comparison'}) {
  const [pos, setPos] = useState(50);
  const inputId = useId();

  return (
    <div
      className='ba'
      style={{'--pos': `${pos}%`}}>
      <Picture
        id={after}
        sizes='(min-width: 1100px) 1100px, 100vw'
        className='ba__img'
      />
      <div
        className='ba__before'
        aria-hidden='true'>
        <Picture
          id={before}
          sizes='(min-width: 1100px) 1100px, 100vw'
          className='ba__img'
          alt=''
        />
      </div>
      <span
        className='ba__tag ba__tag--before'
        aria-hidden='true'>
        Before
      </span>
      <span
        className='ba__tag ba__tag--after'
        aria-hidden='true'>
        After
      </span>
      <div
        className='ba__handle'
        aria-hidden='true'>
        <span />
      </div>
      <label
        htmlFor={inputId}
        className='visually-hidden'>
        {label}
      </label>
      <input
        id={inputId}
        className='ba__range'
        type='range'
        min='0'
        max='100'
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% before`}
      />
    </div>
  );
}
