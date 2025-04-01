export const Alert = ({ children, className }) => {
    return (
      <div className={`alert ${className}`}>
        {children}
      </div>
    );
  };
  
  export const AlertTitle = ({ children }) => <strong>{children}</strong>;
  
  export const AlertDescription = ({ children }) => <p>{children}</p>;
  