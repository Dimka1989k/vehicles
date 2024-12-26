const Button: React.FC<{ onClick?: () => void; disabled?: boolean; children: React.ReactNode }> = ({
  onClick,
  disabled,
  children,
}) => (
  <button
    className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ${
      disabled
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;