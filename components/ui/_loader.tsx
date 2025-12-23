interface LoaderProps {
  text?: string;
}

export default function Loader({ text = "Loading" }: LoaderProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-500 dark:border-white/50 dark:border-t-white/10 rounded-full animate-spin" />

        <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/20 dark:text-white/50 animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
}
