export default function LogoutTimer({ logoutTimer }) {
  return (
    <p className='logout-timer'>
      You will be logged out in <span className='timer'>{logoutTimer}</span>
    </p>
  );
}
