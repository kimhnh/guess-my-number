import Inner from './Inner';

export default function Balance({ currBalance }) {
  return (
    <div className='balance'>
      <Inner>
        <p className='balance__label'>Current balance</p>
        <p className='balance__date'>
          As of <span className='date'>05/03/2037</span>
        </p>
      </Inner>
      <p className='balance__value'>{currBalance} EUR</p>
    </div>
  );
}
