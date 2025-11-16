import Link from "next/link";
import { Ban, PlusCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export const EmptyState = ({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) => {
  return (
    <div className="h-full p-8 flex flex-1 flex-col items-center justify-center rounded-md border-2 border-dashed text-center animate-in fade-in-50">
      <div className="size-20 flex items-center justify-center bg-primary/10 rounded-full">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 max-w-sm mx-auto text-sm text-center text-muted-foreground">
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
        <PlusCircle className="mr-2 size-4" />
        {buttonText}
      </Link>
    </div>
  );
};
