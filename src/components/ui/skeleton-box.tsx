export function SkeletonBox({
  width = 'w-32',
  height = 'h-4',
  className = ''
}) {
  return (
    <div
      className={`bg-slate-200 animate-pulse rounded ${width} ${height} ${className}`}
    />
  );
}
