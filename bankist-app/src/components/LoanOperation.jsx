import { useState } from 'react';
import Button from './ui/Button';
import Form from './form/Form';
import Input from './form/Input';
import Label from './form/Label';

export default function LoanOperation({ currMovs, currBalance, setData, user }) {
  const [loan, setLoan] = useState('');
  const nowDate = new Date().toISOString();

  function handleLoanSubmit(e) {
    e.preventDefault();
    if (loan > 0 && currMovs.some((mov) => mov <= loan * 0.1)) {
      setData((d) =>
        d.map((i) =>
          user === i.username
            ? {
                ...i,
                movements: [...i.movements, loan],
                balance: currBalance + loan,
                movementsDates: [...i.movementsDates, nowDate],
              }
            : i
        )
      );
    } else {
      console.log('Failed to receive loan.');
    }
    setLoan('');
  }

  return (
    <div className='operation operation--loan'>
      <h2>Request loan</h2>

      <Form
        className={'form form--loan'}
        onSubmit={handleLoanSubmit}
      >
        <Input
          type={'number'}
          className={'form__input form__input--loan-amount'}
          value={loan}
          onChange={(e) => setLoan(Number(e.target.value))}
        />
        <Button className='form__btn form__btn--loan'>→</Button>

        <Label className='form__label form__label--loan'>Amount</Label>
      </Form>
    </div>
  );
}
