export default function Operations({ tab }) {
  return (
    <div className='operations__content operations__content--active'>
      <div className={`operations__icon operations__icon--${tab.num}`}>
        <svg>
          <use xlinkHref={tab.svg}></use>
        </svg>
      </div>
      <h5 className='operations__header'>{tab.header}</h5>
      <p>{tab.description}</p>
    </div>
  );
}
