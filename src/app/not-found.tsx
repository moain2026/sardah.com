import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pearl-texture px-6">
      <div className="text-center max-w-md">
        <span className="editorial-eyebrow">404</span>
        <h1 className="editorial-heading text-display-lg mt-6 mb-4">
          الصفحة <span className="gradient-text">غير موجودة</span>
        </h1>
        <p className="text-onyx-500 leading-loose mb-10">
          عذراً، الصفحة التي تبحثين عنها غير متاحة. ربما تكون قد انتقلت أو تم حذفها.
        </p>
        <Link href="/" className="magnetic-button magnetic-button-gold inline-flex">
          <span>العودة للرئيسية</span>
        </Link>
      </div>
    </main>
  );
}
