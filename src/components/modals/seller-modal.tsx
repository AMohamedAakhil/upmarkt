"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "@/trpc/client";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useSellerModal } from "@/hooks/use-seller-modal";

export const SellerModal = () => {
  const storeModal = useSellerModal();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const sellerSchema = z.object({
    email: z.string().email().min(1, "Email is required"),
  });
  type sellerType = z.infer<typeof sellerSchema>;

  const form = useForm<z.infer<typeof sellerSchema>>({
    resolver: zodResolver(sellerSchema),
  });
  const { formState } = form;

  const onSubmit = async (values: sellerType) => {
    try {
      setLoading(true);
      const response = await api.clerk.inviteUser.query(values.email);
      console.log(response);
      storeModal.onClose();
      toast({
        title: `Sent invitation to seller: ${values.email}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Invite Seller to Upmarkt"
      description="Enter the email of the seller to be invited."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-8 py-2 pb-4">
          <div className="space-y-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Seller's Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Enter Seller Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full items-center justify-end space-x-2 pt-6">
                  <Button
                    disabled={loading}
                    variant="outline"
                    type="button"
                    onClick={storeModal.onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={() => {
                      console.log(formState.errors);
                    }}
                    type="submit"
                  >
                    Invite Seller
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
