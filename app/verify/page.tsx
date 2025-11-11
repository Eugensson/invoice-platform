import Link from "next/link";
import { ArrowLeft, Mail, MailWarning } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const Verify = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="px-5 w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="size-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100">
            <Mail className="size-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We have sent a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 mt-4 rounded-md bg-yellow-50 border-yellow-300">
            <div className="flex items-center justify-center">
              <MailWarning className="size-5 text-yellow-700" />
              <p className="ml-2 text-sm font-medium text-yellow-700">
                Be sure to check your spam folder!
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              className: "w-full",
            })}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
