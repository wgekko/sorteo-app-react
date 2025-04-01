export const Input = ({ type, value, onChange, placeholder, className }) => {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`py-2 px-4 rounded-md ${className}`}
      />
    );
  };
  