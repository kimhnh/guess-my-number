export default function Input({ type, placeholder, maxLength, value, onChange, className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}
