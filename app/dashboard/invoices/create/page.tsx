import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { CreateInvoice } from "@/components/create-invoice";

const getUserData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });

  return data;
};

const CreateInvoicePage = async () => {
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);

  return (
    <CreateInvoice
      firstName={data?.firstName as string}
      lastName={data?.lastName as string}
      address={data?.address as string}
      email={data?.email as string}
    />
  );
};

export default CreateInvoicePage;
