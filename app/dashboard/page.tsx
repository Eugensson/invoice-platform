import { Suspense } from "react";

import { EmptyState } from "@/components/empty-state";
import { InvoiceGraph } from "@/components/invoice-graph";
import { RecentInvoices } from "@/components/recent-invoices";
import { DashboardBlocks } from "@/components/dashboard-blocks";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";

export const getData = async (userId: string) => {
  const data = await prisma.invoice.findMany({
    where: { userId },
    select: { id: true },
  });

  return data;
};

const Dashboard = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices yet"
          description="You can create one by clicking the button below."
          buttonText="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardBlocks />
          <div className="grid lg:grid-cols-[2fr_1fr] gap-4 md:gap-8">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      )}
    </>
  );
};

export default Dashboard;
