import Link from "next/link";
import { FaFileInvoiceDollar } from "react-icons/fa6";

export const Logo = () => {
  return (
    <Link href="/" className="flex place-items-stretch gap-1.5">
      <FaFileInvoiceDollar className="size-7 text-blue-600" />
      <p className="text-2xl font-bold">
        Invoice<span className="text-blue-600">Platform</span>
      </p>
    </Link>
  );
};
