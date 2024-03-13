import formatCurrency from '../utils/formatCurrency';
import Button from './ui/Button';

export default function Summary({ loggedUser, currMovs, currInterest, onSortClick }) {
  // currMovs, currInterest redundancy check
  const summaryIn = currMovs.filter((mov) => mov > 0).reduce((acc, curr) => acc + curr, 0);
  const summaryOut = Math.abs(
    currMovs.filter((mov) => mov < 0).reduce((acc, curr) => acc + curr, 0)
  );
  const summaryInterest = currMovs
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * currInterest) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  return (
    <div className='summary'>
      <p className='summary__label'>In</p>
      <p className='summary__value summary__value--in'>{formatCurrency(loggedUser, summaryIn)}</p>
      <p className='summary__label'>Out</p>
      <p className='summary__value summary__value--out'>{formatCurrency(loggedUser, summaryOut)}</p>
      {/* interest per deposit as long as the interest is >= 1 euro */}
      <p className='summary__label'>Interest</p>
      <p className='summary__value summary__value--interest'>
        {formatCurrency(loggedUser, summaryInterest)}
      </p>
      <Button
        className='btn--sort'
        onClick={onSortClick}
      >
        ↓ SORT
      </Button>
    </div>
  );
}
