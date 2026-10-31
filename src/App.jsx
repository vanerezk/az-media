import {lazy, Suspense, useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const Pricing = lazy(() => import('./pages/Pricing'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Scroll to the hash target if there is one, otherwise to the top, on every navigation.
function ScrollManager() {
  const {pathname, hash} = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Lazy pages may not have rendered the target yet, so keep looking briefly.
    let frame;
    const started = performance.now();
    const find = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView();
      else if (performance.now() - started < 2000) frame = requestAnimationFrame(find);
      else window.scrollTo(0, 0);
    };
    find();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <a
        className='skip-link'
        href='#main'>
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main
        id='main'
        tabIndex={-1}>
        <Suspense fallback={<div style={{minHeight: '100vh'}} />}>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/pricing'
              element={<Pricing />}
            />
            <Route
              path='/pricings'
              element={
                <Navigate
                  to='/pricing'
                  replace
                />
              }
            />
            <Route
              path='/portfolio'
              element={<Portfolio />}
            />
            <Route
              path='/contact'
              element={<Contact />}
            />
            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
