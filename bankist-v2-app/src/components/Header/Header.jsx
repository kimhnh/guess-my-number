import { useEffect, useState, useRef } from 'react';
import NavListItem from '../ui/NavListItem';
import './Header.css';

// TODO: animation on mouseover/out on links
// https://dev.to/producthackers/intersection-observer-using-react-49ko

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const headerEl = useRef(null);

  function callback(entries) {
    const [entry] = entries; // destructure
    setSticky(!entry.isIntersecting); // boolean value
  }

  const options = {
    root: null, //entire viewport
    rootMargin: `-90px`, // hard-coded for now
    threshold: 0,
  };
  // useEffect
  useEffect(() => {
    const headerObserver = new IntersectionObserver(callback, options);
    if (headerEl.current) headerObserver.observe(headerEl.current);

    // clean-up function
    return () => {
      if (headerEl.current) headerObserver.unobserve(headerEl.current);
    };
  }, []);

  return (
    <header
      className='header'
      ref={headerEl}
    >
      {/* Navbar */}
      <nav className={`nav ${sticky ? 'sticky' : ''}`}>
        <img
          src='/logo.png'
          alt='bankist logo'
          className='nav__logo'
          id='logo'
        />
        <ul className='nav__links'>
          <NavListItem href={'#section--1'}>Features</NavListItem>
          <NavListItem href={'#section--2'}>Operations</NavListItem>
          <NavListItem href={'#section--3'}>Testimonials</NavListItem>
          <NavListItem
            className={'nav__link nav__link--btn btn--show-modal'}
            href={'#'}
          >
            Open Account
          </NavListItem>
        </ul>
      </nav>

      {/* Header Content */}
      <div className='header__title'>
        <h1>
          When <span className='highlight'>banking</span> meets
          <br />
          <span className='highlight'>minimalist</span>
        </h1>
        <h4>A simpler banking experience for a simpler life.</h4>
        {/* Learn how to implement HTML entities in React */}
        <button className='btn--text btn--scroll-to'>Learn more</button>
        <img
          src='/src/assets/images/hero.png'
          alt='minimalist bank items'
          className='header__img'
        />
      </div>
    </header>
  );
}
