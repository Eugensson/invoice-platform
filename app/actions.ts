"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { onboardingSchema } from "@/app/utils/zodSchemas";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onboardUser = async (prevState: any, formData: FormData) => {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
};
