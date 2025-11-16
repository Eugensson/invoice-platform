import Link from "next/link";

import { Logo } from "@/components/logo";
import { RainbowButton } from "@/components/ui/rainbow-button";

export const Navbar = () => {
  return (
    <nav className="py-5 flex items-center justify-between">
      <Logo />
      <Link href="/login">
        <RainbowButton size="lg" className="rounded-md">
          Get Started
        </RainbowButton>
      </Link>
    </nav>
  );
};
