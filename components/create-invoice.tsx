"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

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

export const CreateInvoice = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-1">
          <div className="w-fit flex items-center gap-4">
            <Badge variant="secondary">Draft</Badge>
            <Input placeholder="Test 123" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Invoive No.</Label>
            <div className="flex">
              <span className="px-3 flex items-center border border-r-0 rounded-l-md bg-muted">
                #
              </span>
              <Input className="rounded-l-none" placeholder="5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">United States Dollar -- USD</SelectItem>
                <SelectItem value="eur">Euro -- EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>From</Label>
            <Input placeholder="Your name" />
            <Input placeholder="Your email" />
            <Input placeholder="Your address" />
          </div>
          <div className="space-y-2">
            <Label>To</Label>
            <Input placeholder="Client name" />
            <Input placeholder="Client email" />
            <Input placeholder="Client address" />
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
          </div>
          <div className="space-y-2">
            <Label>Invoice Due</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select due date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Due on Receipt</SelectItem>
                <SelectItem value="15">Net 15</SelectItem>
                <SelectItem value="30">Net 30</SelectItem>
              </SelectContent>
            </Select>
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
              <Textarea placeholder="Item name & description" />
            </div>
            <div className="col-span-2">
              <Input type="number" min={0} placeholder="0" />
            </div>
            <div className="col-span-2">
              <Input type="number" min={0} placeholder="0" />
            </div>{" "}
            <div className="col-span-2">
              <Input type="number" disabled placeholder="0" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="py-2 flex items-center justify-between">
              <span>Subtotal</span>
              <span>$5.00</span>
            </div>
            <div className="py-2 flex items-center justify-between border-t">
              <span>Total (USD)</span>
              <span className="font-medium underline underline-offset-2">
                $5.00
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Note</Label>
          <Textarea placeholder="Add your note(-s) right here..." />
        </div>
        <div className="flex items-center justify-end">
          <SubmitButton text="Send invoice to Client" className="w-fit" />
        </div>
      </CardContent>
    </Card>
  );
};
