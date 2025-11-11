import { auth } from "@/app/utils/auth";
import { redirect } from "next/navigation";

export const requireUser = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return session;
};
