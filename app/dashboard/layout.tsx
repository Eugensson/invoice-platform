import Link from "next/link";
import { redirect } from "next/navigation";
import { Menu, User2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DashboardLinks } from "@/components/dashboard-links";

import prisma from "@/app/utils/db";
import { signOut } from "@/app/utils/auth";
import { requireUser } from "@/app/utils/hooks";

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { firstName: true, lastName: true, address: true },
  });

  if (!data?.firstName || !data?.lastName || !data?.address) {
    return redirect("/onboarding");
  }
}

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await requireUser();
  await getUser(session.user?.id as string);

  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="max-h-screen h-full flex flex-col gap-2">
            <div className="h-14 lg:h-15 px-4 lg:px-6 flex items-center border-b">
              <Logo />
            </div>
            <div className="flex-1">
              <DashboardLinks containerStyles="px-2 lg:px-4 grid items-start text-sm font-medium" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="h-14 lg:h-15 px-4 lg:px-6 flex items-center gap-4 border-b bg-muted/40">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="sr-only" />
                <SheetDescription className="sr-only" />
                <DashboardLinks
                  containerStyles="mt-15"
                  listStyles="grid gap-2"
                />
              </SheetContent>
            </Sheet>
            <div className="ml-auto flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <User2 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/invoices">Invoices</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button type="submit" className="w-full text-left">
                        Log out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="p-4 lg:p-6 flex flex-1 flex-col gap-4 lg:gap-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
