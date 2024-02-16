export default function Button({ className, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
