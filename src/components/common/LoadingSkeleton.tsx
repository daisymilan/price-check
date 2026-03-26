/**
 * Loading Skeleton Component
 */

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card card-dark p-4">
          <div className="flex gap-4">
            <div className="skeleton h-32 w-32 flex-shrink-0" />
            <div className="flex-grow space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-4 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
