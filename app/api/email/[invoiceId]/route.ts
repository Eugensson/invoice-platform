import { NextResponse } from "next/server";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";

export const POST = async (
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) => {
  try {
    const session = await requireUser();
    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: { id: invoiceId, userId: session.user?.id },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: process.env.EMAIL_FROM!,
      name: "Invoice Platform",
    };

    emailClient.send({
      from: sender,
      // invoiceData.clientEmail
      to: [{ email: "twitch.live.ua@gmail.com" }],
      template_uuid: "45cd685f-8407-4d14-90ce-d21a739fcc17",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "Invoice Platform",
        company_info_address: "Bridge Street",
        company_info_city: "Kington",
        company_info_zip_code: "HR5 3DJ",
        company_info_country: "United Kingdom",
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "FAiled to send email renainder" },
      { status: 500 }
    );
  }
};
