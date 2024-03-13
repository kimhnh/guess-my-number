import formatCurrency from '../utils/formatCurrency';
import Inner from './Inner';

export default function Movements({ loggedUser, currMovs }) {
  // format dates
  function formatMovDates(account, index) {
    // calculate days passed from NOW to movement date
    function calcDates(date1, date2) {
      return Math.round(Math.abs(date1 - date2));
    }

    const daysPassed = calcDates(new Date(), new Date(account.movementsDates[index]));

    // conditionally return value [FIX]
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed < 8) {
      return `${daysPassed} days ago`;
    } else {
      return new Intl.DateTimeFormat(account.locale).format(
        new Date(account.movementsDates[index])
      );
    }
  }

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
          <div className='movements__date'>{formatMovDates(loggedUser, index)}</div>
          <div className='movements__value'>{formatCurrency(loggedUser, mov)}</div>
        </Inner>
      ))}
    </div>
  );
}
