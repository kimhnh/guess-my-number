import Button from './ui/Button';
import Form from './ui/Form';

export default function Navbar({ loggedUser, onLoginSubmit, onLogout, children }) {
  return (
    <nav>
      <p className='welcome'>
        {!loggedUser
          ? 'Log in to get started.'
          : `Welcome back, ${loggedUser.owner.split(' ')[0]}!`}
      </p>
      <img
        src='./src/assets/logo.png'
        alt='logo'
        className='logo'
      />

      {!loggedUser ? (
        <Form
          className={'login'}
          onSubmit={onLoginSubmit}
        >
          {/* Input Logins */}
          {children}
          <Button className='login__btn'>→</Button>
        </Form>
      ) : (
        <Button
          onClick={onLogout}
          className='login__btn'
        >
          Logout
        </Button>
      )}
    </nav>
  );
}
