import Link from "next/link";
import Image from "next/image";

import heroImage from "@/public/hero.jpg";
import { RainbowButton } from "@/components/ui/rainbow-button";

export const Hero = () => {
  return (
    <section className="relative py-12 lg:py-20 flex flex-col items-center justify-center">
      <div className="text-center">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 rounded-full px-4 py-2">
          Introducing the Invoice Platform 1.0
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
          Invoicing made
          <span className="block bg-linear-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text">
            effortlessly simple!
          </span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto lg:text-lg text-muted-foreground">
          Say goodbye to invoicing stress. Invoices Platform helps you get paid
          quickly and without hassle.
        </p>
        <div className="mt-7 mb-12">
          <Link href="/login">
            <RainbowButton size="lg" className="rounded-md">
              Get Unlimited Access
            </RainbowButton>
          </Link>
        </div>
      </div>
      <div className="relative w-full mt-12 py-12 mx-auto flex items-center">
        <Image
          src={heroImage}
          alt="Invoice Platform Dashboard Screenshot"
          className="relative w-full object-cover border rounded-lg lg:rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
};
