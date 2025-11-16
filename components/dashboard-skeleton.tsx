import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="p-4 lg:p-6 flex flex-1 flex-col gap-4 lg:gap-6">
      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index}>
            <Skeleton className="w-full h-25 rounded-md" />
          </li>
        ))}
      </ul>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4 md:gap-8">
        <Skeleton className="w-full h-132 rounded-md" />
        <Skeleton className="w-full h-132 rounded-md" />
      </div>
    </div>
  );
};
