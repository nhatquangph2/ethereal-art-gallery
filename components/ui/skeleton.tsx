import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-2xl bg-white/30', className)}
      {...props}
    />
  );
}

export function ArtworkCardSkeleton() {
  return (
    <div className="glass rounded-3xl p-6">
      <Skeleton className="mb-4 h-64 w-full" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-3 h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
    </div>
  );
}

export function GalleryCardSkeleton() {
  return (
    <div className="glass rounded-3xl overflow-hidden">
      <Skeleton className="h-96 w-full" />
      <div className="p-6">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
