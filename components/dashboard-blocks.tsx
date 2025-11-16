import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { formatCurrency } from "@/app/utils/format-currency";

const getData = async (userId: string) => {
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({ where: { userId }, select: { total: true } }),
    prisma.invoice.findMany({
      where: { userId, status: "PENDING" },
      select: { id: true },
    }),
    prisma.invoice.findMany({
      where: { userId, status: "PAID" },
      select: { id: true },
    }),
  ]);

  return { data, openInvoices, paidInvoices };
};

export const DashboardBlocks = async () => {
  const session = await requireUser();

  const { data, openInvoices, paidInvoices } = await getData(
    session.user?.id as string
  );

  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
      <li>
        <Card className="gap-y-2">
          <CardHeader className="flex items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium capitalize">
              Total revenue
            </CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="mb-1 text-2xl font-bold">
              {formatCurrency({
                amount: data.reduce((acc, invoice) => acc + invoice.total, 0),
                currency: "USD",
              })}
            </h2>
            <p className="text-xs text-muted-foreground">
              Based on total volume.
            </p>
          </CardContent>
        </Card>
      </li>
      <li>
        <Card className="gap-y-2">
          <CardHeader className="flex items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium capitalize">
              Total invoices issued
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="mb-1 text-2xl font-bold">+{data.length}</h2>
            <p className="text-xs text-muted-foreground">
              Total invoices issued.
            </p>
          </CardContent>
        </Card>
      </li>
      <li>
        <Card className="gap-y-2">
          <CardHeader className="flex items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium capitalize">
              Paid invoices
            </CardTitle>
            <CreditCard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="mb-1 text-2xl font-bold">+{paidInvoices.length}</h2>
            <p className="text-xs text-muted-foreground">
              Total invoices wich have been paid.
            </p>
          </CardContent>
        </Card>
      </li>
      <li>
        <Card className="gap-y-2">
          <CardHeader className="flex items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium capitalize">
              Pending invoices
            </CardTitle>
            <Activity className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="mb-1 text-2xl font-bold">+{openInvoices.length}</h2>
            <p className="text-xs text-muted-foreground">
              Invoices which have not been paid yet.
            </p>
          </CardContent>
        </Card>
      </li>
    </ul>
  );
};
