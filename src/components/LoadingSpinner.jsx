export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      {/* গোল স্পিনার চাকা */}
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-600 dark:border-zinc-800" />
      
      {/* স্পিনারের নিচের লেখা */}
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-wide animate-pulse">
        Loading...
      </p>
    </div>
  );
}