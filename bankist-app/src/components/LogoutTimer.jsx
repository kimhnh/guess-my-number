export default function LogoutTimer({ logoutTimer }) {
  const min = String(Math.floor(logoutTimer / 60)).padStart(2, 0);
  const sec = String(logoutTimer % 60).padStart(2, 0);
  return (
    <p className='logout-timer'>
      You will be logged out in <span className='timer'>{`${min}:${sec}`}</span>
    </p>
  );
}
