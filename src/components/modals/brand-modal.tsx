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
import { Brand } from "@prisma/client";
import { shallow } from "zustand/shallow";
import { useBrand } from "@/hooks/use-brands";
import { useBrandModal } from "@/hooks/use-brand-modal";
import ImageUpload from "../ui/image-upload";

export const BrandModal = () => {
  const storeModal = useBrandModal();
  const { toast } = useToast();
  const setBrands = useBrand((state) => state.setBrands, shallow);
  const brands = useBrand((state) => state.brands, shallow);

  const [loading, setLoading] = useState(false);

  const brandSchema = z.object({
    name: z.string().min(1, "Name is required"),
    logoUrl: z.string().min(1, "Logo URL is required"),
  });

  const form = useForm<Brand>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      logoUrl: "",
    },
  });
  const { formState, setValue } = form;

  const onSubmit = async (values: Brand) => {
    try {
      setLoading(true);
      const response = await api.misc.createBrand.mutate(values);
      setBrands([...brands, response]);
      console.log(response);
      storeModal.onClose();
      toast({
        title: `Created Brand: ${values.name}`,
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
      setValue("name", "");
      setValue("logoUrl", "");
    }
  };

  return (
    <Modal
      title="Create Brand"
      description="Add a new brand to the store."
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
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Brand Name"
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
                      <FormLabel>Upload Logo</FormLabel>
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
                    Create Brand
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
