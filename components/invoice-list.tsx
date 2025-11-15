import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InvoiceActions } from "@/components/invoice-actions";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { formatCurrency } from "@/app/utils/format-currency";

export const getData = async (userId: string) => {
  const data = await prisma.invoice.findMany({
    where: { userId },
    select: {
      id: true,
      clientName: true,
      total: true,
      currency: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return data;
};

export const InvoiceList = async () => {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>#{invoice.invoiceNumber}</TableCell>
            <TableCell>{invoice.clientName}</TableCell>
            <TableCell>
              {formatCurrency({
                amount: invoice.total,
                currency: invoice.currency as "USD" | "EUR",
              })}
            </TableCell>
            <TableCell>
              <Badge>{invoice.status}</Badge>
            </TableCell>
            <TableCell>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(invoice.createdAt)}
            </TableCell>
            <TableCell className="text-right">
              <InvoiceActions id={invoice.id} status={invoice.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
