"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/image-upload";
import { useTheme } from "next-themes";
import "primereact/resources/primereact.min.css";
import { storeSchema } from "@/server/api/types";
import { api } from "@/trpc/client";
import { currentUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'

const OnboardingForm = ({ emailAddress }: { emailAddress: string }) => {
  useEffect(() => {
    async function checkOnboarding() {
      const store = await api.store.checkStore.query();
      if (store) {
        window.location.href = "/admin";
      }
    }
    checkOnboarding();
  }, []);

  const { theme } = useTheme();
  const router = useRouter()

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      email: emailAddress,
      phone: "",
      description: "",
      address: "",
      logoUrl: "",
      bannerUrl: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof storeSchema>) {
    setLoading(true);

    const storeRes = await api.store.createStore.mutate(values);
    console.log(storeRes);
    console.log(values);
    setLoading(false);
    router.push("/admin");
  }

  return (
    <div>
      {theme === "light" ? (
        <>
          <link
            id="theme-link"
            rel="stylesheet"
            href="/lara-light-indigo/theme.css"
          ></link>
        </>
      ) : (
        <>
          <link
            id="theme-link"
            rel="stylesheet"
            href="/lara-dark-indigo/theme.css"
          ></link>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Create New Store</CardTitle>
          <CardDescription>
            You have to first create a new store to access it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Store Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type="number"
                        placeholder="Enter Phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Store Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Store Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Logo</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        disabled={loading}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bannerUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Banner</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        disabled={loading}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
