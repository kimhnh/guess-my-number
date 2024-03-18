import { useState } from 'react';
import Button from './ui/Button';
import Form from './ui/Form';
import Input from './ui/Input';
import Label from './ui/Label';

export default function TransferOperation({ loggedUser, data, setData, onResetTimer }) {
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const nowDate = new Date().toISOString();

  function handleTransferSubmit(e) {
    e.preventDefault();

    // 1. prevent self-transfer
    // 2. recipient exists in data
    // 3. positive amount
    // 4. transferAmount <= balance

    if (
      loggedUser.username !== transferTo &&
      data.find((d) => transferTo === d.username) &&
      transferAmount > 0 &&
      transferAmount <= loggedUser.balance
    ) {
      // Add movement and date (loggedUser)
      setData((d) =>
        d.map((i) =>
          loggedUser.username === i.username
            ? {
                ...i,
                movements: [...loggedUser.movements, -transferAmount],
                balance: loggedUser.balance - transferAmount,
                movementsDates: [...loggedUser.movementsDates, nowDate],
              }
            : i
        )
      );

      // Add movement and date (recipient)
      setData((d) =>
        d.map((i) =>
          transferTo === i.username
            ? {
                ...i,
                movements: [...i.movements, transferAmount],
                balance: i.balance + transferAmount,
                movementsDates: [...i.movementsDates, nowDate],
              }
            : i
        )
      );
    } else {
      console.log('Failed to transfer.');
    }
    setTransferTo('');
    setTransferAmount('');
    onResetTimer();
  }

  return (
    <div className='operation operation--transfer'>
      <h2>Transfer money</h2>

      <Form
        className={'form form--transfer'}
        onSubmit={handleTransferSubmit}
      >
        <Input
          type={'text'}
          className={'form__input form__input--to'}
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
        />
        <Input
          type={'number'}
          className={'form__input form__input--amount'}
          value={transferAmount}
          onChange={(e) => setTransferAmount(Number(e.target.value))}
        />
        <Button className='form__btn form__btn--transfer'>→</Button>
        <Label className='form__label'>Transfer to</Label>
        <Label className='form__label'>Amount</Label>
      </Form>
    </div>
  );
}
