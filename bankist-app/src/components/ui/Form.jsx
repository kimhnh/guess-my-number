export default function Form({ className, onSubmit, children }) {
  return (
    <form
      className={className}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
