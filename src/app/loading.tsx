export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pearl/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-onyx/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-champagne animate-spin" />
        </div>
        <span className="font-ruqaa text-sm tracking-luxe text-onyx/60">
          سـردة
        </span>
      </div>
    </div>
  );
}
