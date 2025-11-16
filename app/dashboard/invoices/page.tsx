import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { InvoiceList } from "@/components/invoice-list";

const InvoicesPage = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
          <CardDescription>Manager your invoices right here</CardDescription>
        </div>
        <CardAction>
          <Link href="/dashboard/invoices/create" className={buttonVariants()}>
            <Plus />
            Create Invoice
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-full h-115" />}>
          <InvoiceList />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default InvoicesPage;
