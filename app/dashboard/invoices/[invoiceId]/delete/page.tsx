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
import { deleteInvoice } from "@/app/actions";
import { requireUser } from "@/app/utils/hooks";

const Authorize = async (invoiceId: string, userId: string) => {
  const data = await prisma.invoice.findUnique({
    where: { id: invoiceId, userId },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }

  return data;
};

type Params = Promise<{ invoiceId: string }>;

const DeleteInvoicePage = async ({ params }: { params: Params }) => {
  const { invoiceId } = await params;
  const session = await requireUser();

  await Authorize(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure you want to delete this invoice?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src="/warning.jpg"
            alt="Exclamation mark"
            width={100}
            height={100}
            className="rounded-lg mx-auto"
          />
        </CardContent>
        <CardFooter className="flex items-end justify-between">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({
              variant: "secondary",
              className: "px-6",
            })}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await deleteInvoice(invoiceId);
            }}
          >
            <SubmitButton
              text="Delete Invoice"
              className="w-full"
              variant="destructive"
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteInvoicePage;
