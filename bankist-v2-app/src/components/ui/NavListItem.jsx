export default function NavListItem({ className = 'nav__link', href, children }) {
  return (
    <li className='nav__item'>
      <a
        className={className}
        href={href}
      >
        {children}
      </a>
    </li>
  );
}
