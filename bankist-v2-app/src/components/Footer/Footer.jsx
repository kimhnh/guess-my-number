import ListItem from '../ui/ListItem';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <ul className='footer__nav'>
        <ListItem>About</ListItem>
        <ListItem>Pricing</ListItem>
        <ListItem>Terms of Use</ListItem>
        <ListItem>Privacy Policy</ListItem>
        <ListItem>Careers</ListItem>
        <ListItem>Blog</ListItem>
        <ListItem>Contact Us</ListItem>
      </ul>
      <img
        src='/icon.png'
        alt='logo'
        className='footer__logo'
      />
      {/* &copy; HTML entity */}
      <p className='footer__copyright'>
        Copyright by{' '}
        <a
          className='footer__link twitter-link'
          target='_blank'
          href='https://twitter.com/jonasschmedtman'
        >
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as your own product.
      </p>
    </footer>
  );
}
