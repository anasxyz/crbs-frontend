export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />

        <p className="text-xs uppercase tracking-[0.3em] font-medium text-gray-400 animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
