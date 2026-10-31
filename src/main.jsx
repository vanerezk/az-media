import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource-variable/manrope/wght.css';
import './styles/global.css';
import App from './App.jsx';

// index.html carries default meta tags for crawlers that don't run JS.
// Once React is in charge, each page renders its own.
document.querySelectorAll('[data-default-meta]').forEach((el) => el.remove());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
