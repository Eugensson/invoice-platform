import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem] dark:hidden" />
        <div className="hidden dark:block absolute inset-0 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
      </div>
      <Navbar />
      <Hero />
    </main>
  );
};

export default Home;
