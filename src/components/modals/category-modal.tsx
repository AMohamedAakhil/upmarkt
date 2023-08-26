"use client";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/client";
import { categorySchema } from "@/server/api/types";
import { subCategorySchema } from "@/server/api/types";
import { subSubCategorySchema } from "@/server/api/types";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "../ui/toast";
const formSchema = z.object({
  name: z.string().min(1),
});

export const CategoryModal = () => {
  const storeModal = useCategoryModal();
  const router = useRouter();
  const { toast } = useToast()

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    imageUrl: "",
    },
  });
  const {formState} = form

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      setLoading(true);
      const response = await api.category.createCategory.mutate(values);
      console.log(response);
      storeModal.onClose();
      toast({
        title: `Created Category: ${values.name}`,
        description: `With Priority Count Set To ${values.priorityNumber}`,
      })
      
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create category"
      description="Add a new category to add to the store."
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
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Category Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priorityNumber"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className="mt-5">Priority Number</FormLabel>
                      <FormControl>
                        <Input disabled={loading} type="number" placeholder="Priority Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Image URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                    Cancel
                  </Button>
                  <Button disabled={loading}  type="submit">Create Category</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};