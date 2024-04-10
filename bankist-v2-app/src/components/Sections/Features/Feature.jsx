export default function Feature({ xlinkHref, children }) {
  return (
    <div className='features__feature'>
      <div className='features__icon'>
        <svg>
          <use xlinkHref={xlinkHref}></use>
        </svg>
      </div>
      {children}
    </div>
  );
}
