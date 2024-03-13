import { useState } from 'react';
import Button from './ui/Button';
import Form from './form/Form';
import Input from './form/Input';
import Label from './form/Label';

export default function LoanOperation({ loan, setLoan, onLoanSubmit }) {
  // Delay Loan (setTimeout)

  return (
    <div className='operation operation--loan'>
      <h2>Request loan</h2>

      <Form
        className={'form form--loan'}
        onSubmit={onLoanSubmit}
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
