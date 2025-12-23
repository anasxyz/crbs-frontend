interface ButtonProps {
  text: string;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  variant?: "solid" | "outline"; 
}

export default function _button({
  text,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "solid",
}: ButtonProps) {
  const baseStyles = "px-4 py-2 font-medium rounded-3xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    solid: "bg-black hover:bg-gray-800 text-white",
    outline: "bg-transparent border border-gray-400 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-gray-900 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {text}
    </button>
  );
}
