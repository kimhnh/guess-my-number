import Button from './ui/Button';

export default function Summary({ currMovs, data, user, onSortClick }) {
  let currInterest = data.find((d) => user === d.username)?.interestRate;

  return (
    <div className='summary'>
      <p className='summary__label'>In</p>
      <p className='summary__value summary__value--in'>
        {currMovs.filter((mov) => mov > 0).reduce((acc, curr) => acc + curr, 0)}€
      </p>
      <p className='summary__label'>Out</p>
      <p className='summary__value summary__value--out'>
        {Math.abs(currMovs.filter((mov) => mov < 0).reduce((acc, curr) => acc + curr, 0))}€
      </p>
      {/* interest per deposit as long as the interest is >= 1 euro */}
      <p className='summary__label'>Interest</p>
      <p className='summary__value summary__value--interest'>
        {currMovs
          .filter((mov) => mov > 0)
          .map((deposit) => deposit * (currInterest / 100))
          .filter((int) => int >= 1)
          .reduce((acc, int) => acc + int, 0)}
        €
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
