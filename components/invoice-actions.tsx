"use client";

import {
  CheckCircle,
  DownloadCloud,
  Mail,
  MoreVerticalIcon,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InvoiceActionsProps {
  id: string;
  status: "PENDING" | "PAID";
}

export const InvoiceActions = ({ id, status }: InvoiceActionsProps) => {
  const handleSendReminder = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending remainder email...",
        success: "Remainder email sent successfully!",
        error: "Failed to send reminder email",
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}`}>
            <Pencil className="mr-2 size-4" />
            <span>Edit invoice</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${id}`} target="_blank">
            <DownloadCloud className="mr-2 size-4" />
            <span>Download invoice</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder}>
          <Mail className="mr-2 size-4" />
          <span>Reminder email</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}/delete`}>
            <Trash className="mr-2 size-4" />
            <span>Delete invoice</span>
          </Link>
        </DropdownMenuItem>
        {status !== "PAID" && (
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/invoices/${id}/paid`}>
              <CheckCircle className="mr-2 size-4" />
              <span>Mark as paid</span>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
