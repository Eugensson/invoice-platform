"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  text: string;
  className?: string;
}

export const SubmitButton = ({ text, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={cn("mt-5 w-full", className)}
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" /> Please wait...
        </>
      ) : (
        <>{text}</>
      )}
    </Button>
  );
};
