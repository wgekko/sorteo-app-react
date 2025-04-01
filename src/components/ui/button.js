export const Button = ({ children, onClick, className, disabled }) => {
    return (
      <button
        onClick={onClick}
        className={`py-2 px-4 rounded-md ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };
  