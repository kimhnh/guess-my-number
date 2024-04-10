export default function ListItem({ children }) {
  return (
    <li className='footer__item'>
      <a
        className='footer__link'
        href='#'
      >
        {children}
      </a>
    </li>
  );
}
