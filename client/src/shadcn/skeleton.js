import { cn } from "../utils/cn";

/**
 * @param {React.ComponentProps<"div"> & { className?: string }} props
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
