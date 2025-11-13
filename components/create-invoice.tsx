"use client";

import { CalendarIcon } from "lucide-react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { SubmitButton } from "@/components/submit-button";

import { createInvoice } from "@/app/actions";
import { invoiceSchema } from "@/app/utils/zodSchemas";
import { formatCurrency } from "@/app/utils/format-currency";

export const CreateInvoice = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: invoiceSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");

  const calcTotal = (Number(quantity) || 0) * (Number(rate) || 0);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent>
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          noValidate
          className="space-y-6"
        >
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />
          <input type="hidden" name={fields.total.name} value={calcTotal} />
          <div className="flex flex-col gap-1">
            <div className="w-fit flex items-center gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input
                type="text"
                key={fields.invoiceName.key}
                name={fields.invoiceName.name}
                defaultValue={fields.invoiceName.initialValue}
                placeholder="Test 123"
              />
            </div>
            <p className="text-xs text-red-500">{fields.invoiceName.errors}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Invoive No.</Label>
              <div className="flex">
                <span className="px-3 flex items-center border border-r-0 rounded-l-md bg-muted">
                  #
                </span>
                <Input
                  key={fields.invoiceNumber.key}
                  name={fields.invoiceNumber.name}
                  defaultValue={fields.invoiceNumber.initialValue}
                  className="rounded-l-none"
                  placeholder="5"
                />
              </div>
              <p className="text-xs text-red-500">
                {fields.invoiceNumber.errors}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select
                key={fields.currency.key}
                name={fields.currency.name}
                defaultValue="USD"
                onValueChange={(value) => setCurrency(value as "USD" | "EUR")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                  <SelectItem value="EUR">Euro -- EUR</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-red-500">{fields.currency.errors}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>From</Label>
              <Input
                key={fields.fromName.name}
                name={fields.fromName.name}
                placeholder="Your name"
              />
              <p className="text-xs text-red-500">{fields.fromName.errors}</p>
              <Input
                key={fields.fromEmail.key}
                name={fields.fromEmail.name}
                placeholder="Your email"
              />
              <p className="text-xs text-red-500">{fields.fromEmail.errors}</p>
              <Input
                key={fields.fromAddress.name}
                name={fields.fromAddress.name}
                placeholder="Your address"
              />
              <p className="text-xs text-red-500">
                {fields.fromAddress.errors}
              </p>
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Input
                key={fields.clientName.name}
                name={fields.clientName.name}
                defaultValue={fields.clientName.initialValue}
                placeholder="Client name"
              />
              <p className="text-xs text-red-500">{fields.clientName.errors}</p>
              <Input
                key={fields.clientEmail.key}
                name={fields.clientEmail.name}
                defaultValue={fields.clientEmail.initialValue}
                placeholder="Client email"
              />
              <p className="text-xs text-red-500">
                {fields.clientEmail.errors}
              </p>
              <Input
                key={fields.clientAddress.name}
                name={fields.clientAddress.name}
                defaultValue={fields.clientAddress.initialValue}
                placeholder="Client address"
              />
              <p className="text-xs text-red-500">
                {fields.clientAddress.errors}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-70 justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {selectedDate ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-red-500">{fields.date.errors}</p>
            </div>
            <div className="space-y-2">
              <Label>Invoice Due</Label>
              <Select
                key={fields.dueDate.key}
                name={fields.dueDate.name}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Receipt</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-red-500">{fields.dueDate.errors}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="mb-2 grid grid-cols-12 gap-4 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>
            <div className="mb-4 grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <Textarea
                  key={fields.invoiceItemDescription.key}
                  name={fields.invoiceItemDescription.name}
                  defaultValue={fields.invoiceItemDescription.initialValue}
                  placeholder="Item name & description"
                />
                <p className="text-xs text-red-500">
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  key={fields.invoiceItemQuantity.key}
                  name={fields.invoiceItemQuantity.name}
                  type="number"
                  min={0}
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="text-xs text-red-500">
                  {fields.invoiceItemQuantity.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  key={fields.invoiceItemRate.key}
                  name={fields.invoiceItemRate.name}
                  type="number"
                  min={0}
                  placeholder="0"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <p className="text-xs text-red-500">
                  {fields.invoiceItemRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  value={formatCurrency({ amount: calcTotal, currency })}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="py-2 flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency({ amount: calcTotal, currency })}</span>
              </div>
              <div className="py-2 flex items-center justify-between border-t">
                <span>Total ({currency})</span>
                <span className="font-medium underline underline-offset-2">
                  {formatCurrency({ amount: calcTotal, currency })}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Note</Label>
            <Textarea
              key={fields.note.key}
              name={fields.note.name}
              defaultValue={fields.note.initialValue}
              placeholder="Add your note(-s) right here..."
            />
            <p className="text-xs text-red-500">{fields.note.errors}</p>
          </div>
          <div className="flex items-center justify-end">
            <SubmitButton text="Send invoice to Client" className="w-fit" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
