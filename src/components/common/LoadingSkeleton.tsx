/**
 * Loading Skeleton — shown while searching
 */

export default function LoadingSkeleton() {
  return (
    <div className="product-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="product-card overflow-hidden">
          <div className="skeleton h-44 rounded-none" style={{ borderRadius: 0 }} />
          <div className="p-4 space-y-3">
            <div className="skeleton h-2.5 w-14 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-6 w-24 rounded mt-2" />
            <div className="border-t border-gray-100 dark:border-gray-700 mt-3 pt-3 space-y-2">
              <div className="skeleton h-3 w-28 rounded" />
              <div className="skeleton h-3 w-20 rounded" />
            </div>
            <div className="skeleton h-8 w-full rounded-lg mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}
