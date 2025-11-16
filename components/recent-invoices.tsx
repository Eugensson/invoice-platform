import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { formatCurrency } from "@/app/utils/format-currency";

const getData = async (userId: string) => {
  const data = await prisma.invoice.findMany({
    where: { userId },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: { createdAt: "desc" },
    take: 7,
  });

  return data;
};

export const RecentInvoices = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium capitalize">
          Recent invoices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-8">
          {data.map(({ id, clientName, clientEmail, total, currency }) => (
            <li key={id} className="flex items-center gap-4">
              <Avatar className="hidden sm:block size-9">
                <AvatarFallback>
                  {clientName
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((word) => word[0]?.toUpperCase())
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">{clientName}</p>
                <p className="text-sm text-muted-foreground">{clientEmail}</p>
              </div>
              <div className="ml-auto font-medium">
                +
                {formatCurrency({
                  amount: total,
                  currency: currency as "USD" | "EUR",
                })}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
