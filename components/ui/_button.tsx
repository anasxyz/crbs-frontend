interface ButtonProps {
  text: string;
  onClick?: () => void | Promise<void>; 
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean; 
}

export default function _button({
  text,
  onClick,
  type = "button",
  className = "",
  disabled = false, 
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled} 
      className={`px-4 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-3xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  );
}
