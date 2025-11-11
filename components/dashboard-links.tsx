"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { dashboardLinks } from "@/lib/data";

interface DashboardLinksProps {
  containerStyles?: string;
  listStyles?: string;
}

export const DashboardLinks = ({
  containerStyles,
  listStyles,
}: DashboardLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className={containerStyles}>
      <ul className={listStyles}>
        {dashboardLinks.map(({ id, name, href, icon: Icon }) => (
          <li
            key={id}
            className={cn(
              href === pathname
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground",
              "rounded-lg py-2 px-3 transition-colors"
            )}
          >
            <Link href={href} className="flex items-center gap-3">
              <Icon className="size-4" />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
