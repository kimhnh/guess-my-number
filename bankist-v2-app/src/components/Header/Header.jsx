import NavListItem from '../ui/NavListItem';
import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      {/* Navbar */}
      <nav className='nav'>
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
