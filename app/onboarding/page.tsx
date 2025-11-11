"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";

import { onboardUser } from "@/app/actions";
import { onboardingSchema } from "@/app/utils/zodSchemas";

const OnboardingPage = () => {
  const [lastResult, action] = useActionState(onboardUser, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">You are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
            className="grid md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                name={fields.firstName.name}
                key={fields.firstName.key}
                defaultValue={fields.firstName.initialValue}
                id="firstName"
                placeholder="John"
              />
              <p className="text-sm text-red-500">{fields.firstName.errors}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                name={fields.lastName.name}
                key={fields.lastName.key}
                defaultValue={fields.lastName.initialValue}
                id="lastName"
                placeholder="Doe"
              />
              <p className="text-sm text-red-500">{fields.lastName.errors}</p>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                name={fields.address.name}
                key={fields.address.key}
                defaultValue={fields.address.initialValue}
                id="address"
                placeholder="123 Main St., Anytown, USA, 12345"
              />
              <p className="text-sm text-red-500">{fields.address.errors}</p>
            </div>
            <SubmitButton text="Finish onboarding" className="md:col-span-2" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
