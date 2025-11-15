import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { markInvoiceAsPaid } from "@/app/actions";

const Authorize = async (invoiceId: string, userId: string) => {
  const data = await prisma.invoice.findUnique({
    where: { id: invoiceId, userId },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }
};

type Params = Promise<{ invoiceId: string }>;

const MarkIsPaidPage = async ({ params }: { params: Params }) => {
  const { invoiceId } = await params;
  const session = await requireUser();

  await Authorize(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Mark Invoice as Paid
          </CardTitle>
          <CardDescription>
            Are you sure you want to mark this invoice as paid?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src="/paid.jpg"
            alt="Paid stamp"
            width={100}
            height={100}
            className="rounded-lg mx-auto"
          />
        </CardContent>
        <CardFooter className="flex items-end justify-between">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({
              variant: "outline",
              className: "px-6",
            })}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await markInvoiceAsPaid(invoiceId);
            }}
          >
            <SubmitButton text="Mark as Paid" className="w-full" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MarkIsPaidPage;
