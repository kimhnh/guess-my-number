import Inner from './Inner';

export default function Movements({ currMovs }) {
  return (
    <div className='movements'>
      {currMovs.toReversed().map((mov, index, arr) => (
        <Inner
          className={'movements__row'}
          key={crypto.randomUUID()}
        >
          <div className={`movements__type movements__type--${mov > 0 ? 'deposit' : 'withdrawal'}`}>
            {arr.length - index} {mov > 0 ? 'deposit' : 'withdrawal'}
          </div>
          <div className='movements__date'>3 days ago</div>
          <div className='movements__value'>{mov}€</div>
        </Inner>
      ))}
    </div>
  );
}
