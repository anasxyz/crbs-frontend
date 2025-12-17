interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function _button({
  text,
  onClick,
  type = "button",
  className = ""
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200 ${className}`}
    >
      {text}
    </button>
  );
}
