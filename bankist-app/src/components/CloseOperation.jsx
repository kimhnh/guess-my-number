import { useState } from 'react';
import Button from './ui/Button';
import Form from './form/Form';
import Input from './form/Input';
import Label from './form/Label';

export default function CloseOperation({ loggedUser, setData, onLogInOut }) {
  const [closeUser, setCloseUser] = useState('');
  const [closePassword, setClosePassword] = useState('');

  function handleCloseSubmit(e) {
    e.preventDefault();

    // check if current user === close user
    if (loggedUser.username === closeUser && loggedUser.pin === closePassword) {
      setData((d) => d.filter((i) => closeUser !== i.username));
      onLogInOut(); // logout
    } else {
      console.log('Failed to close account.');
    }
  }
  return (
    <div className='operation operation--close'>
      <h2>Close account</h2>

      <Form
        className={'form form--close'}
        onSubmit={handleCloseSubmit}
      >
        <Input
          type={'text'}
          className={'form__input form__input--user'}
          value={closeUser}
          onChange={(e) => setCloseUser(e.target.value)}
        />
        <Input
          type={'password'}
          maxLength={4}
          className={'form__input form__input--pin'}
          value={closePassword}
          onChange={(e) => setClosePassword(Number(e.target.value))}
        />

        <Button className={'form__btn form__btn--close'}>→</Button>
        <Label className={'form__label'}>Confirm user</Label>
        <Label className={'form__label'}>Confirm PIN</Label>
      </Form>
    </div>
  );
}
