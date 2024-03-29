"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/client";
import { categorySchema } from "@/server/api/types";
import { subCategorySchema } from "@/server/api/types";
import { subSubCategorySchema } from "@/server/api/types";
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
import { useCategoryModal } from "@/hooks/use-category-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useCategory } from "@/hooks/use-categories";
const formSchema = z.object({
  name: z.string().min(1),
});

import { shallow } from "zustand/shallow";
import ImageUpload from "../ui/image-upload";

export const CategoryModal = () => {
  const storeModal = useCategoryModal();
  const router = useRouter();
  const { toast } = useToast();
  const setCategories = useCategory((state) => state.setCategories, shallow);
  const categories = useCategory((state) => state.categories, shallow);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      priorityNumber: "",
    },
  });
  const { formState, setValue } = form;
  const onFetch = useCategoryModal((state) => state.onFetch);

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      setLoading(true);
      const response = await api.category.createCategory.mutate(values);
      setCategories([...categories, response]);
      console.log(response);
      storeModal.onClose();
      onFetch();
      toast({
        title: `Created Category: ${values.name}`,
        description: `With Priority Count Set To ${values.priorityNumber}`,
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
      setValue("imageUrl", "");
      setValue("priorityNumber", "");
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
                        <Input
                          disabled={loading}
                          placeholder="Category Name"
                          {...field}
                        />
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
                        <Input
                          disabled={loading}
                          type="number"
                          placeholder="Priority Number"
                          {...field}
                        />
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
                      <FormLabel>Image Upload</FormLabel>
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
                    Create Category
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
