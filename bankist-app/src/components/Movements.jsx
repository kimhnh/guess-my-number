import formatCurrency from '../utils/formatCurrency';
import Inner from './ui/Inner';

function formatMovDates(account, date) {
  // calculate days passed from NOW to movement date
  function calcDates(date1, date2) {
    return Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  }

  const daysPassed = calcDates(new Date(), new Date(date)); // returns a rounded value

  if (daysPassed == 0) return 'Today';
  if (daysPassed == 1) return 'Yesterday';
  if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    return new Intl.DateTimeFormat(account.locale).format(new Date(date)); // need new Date(date)
  }
}

// currUser is a derived state
export default function Movements({ currUser, currMovs }) {
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
          <div className='movements__date'>
            {formatMovDates(currUser, currUser.movementsDates[arr.length - 1 - index])}
          </div>
          <div className='movements__value'>{formatCurrency(currUser, mov)}</div>
        </Inner>
      ))}
    </div>
  );
}
