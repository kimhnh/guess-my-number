import formatCurrency from '../utils/formatCurrency';
import Inner from './Inner';

export default function Balance({ loggedUser, currBalance }) {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  const currDate = new Intl.DateTimeFormat(loggedUser.locale, options).format(now);

  return (
    <div className='balance'>
      <Inner>
        <p className='balance__label'>Current balance</p>
        <p className='balance__date'>
          As of <span className='date'>{currDate}</span>
        </p>
      </Inner>
      <p className='balance__value'>{formatCurrency(loggedUser, currBalance)}</p>
    </div>
  );
}
