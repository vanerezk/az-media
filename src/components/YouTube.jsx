import {useState} from 'react';
import {Play} from 'lucide-react';

// Click-to-load embed: no YouTube scripts or cookies until the visitor asks for the video.
export default function YouTube({id, title}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        className='yt'
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow='autoplay; encrypted-media; picture-in-picture; fullscreen'
        allowFullScreen
        referrerPolicy='strict-origin-when-cross-origin'
      />
    );
  }

  return (
    <button
      type='button'
      className='yt yt--poster'
      onClick={() => setActive(true)}
      style={{backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`}}>
      <span className='yt__play'>
        <Play
          aria-hidden='true'
          fill='currentColor'
        />
      </span>
      <span className='visually-hidden'>Play video: {title}</span>
    </button>
  );
}
