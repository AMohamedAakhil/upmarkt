"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/client";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useSubCategoryModal } from "@/hooks/use-sub-category-modal";
import { shallow } from "zustand/shallow";
import { useSubcategory } from "@/hooks/use-subcategories";

export const SubCategoryModal = ({ categoryId }: { categoryId: string }) => {
  const storeModal = useSubCategoryModal();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const subCategoryForm = useForm<z.infer<typeof subCategorySchema>>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      categoryId: "",
      name: "",
      priorityNumber: "",
      imageUrl: "",
    },
  });
  const { formState } = subCategoryForm;
  const setSubcategories = useSubcategory(
    (state) => state.setSubcategories,
    shallow
  );
  const subcategories = api.category.getSubCategories.query({
    categoryId: categoryId,
  });
  const onSubmit = async (values: z.infer<typeof subCategorySchema>) => {
    try {
      console.log("start");
      setLoading(true);
      values.categoryId = categoryId;
      const response = await api.category.createSubCategory.mutate(values);
      setSubcategories([...(await subcategories), response]);
      console.log(response);
      storeModal.onClose();
      toast({
        title: `Created Subcategory: ${values.name}`,
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
    }
  };

  return (
    <Modal
      title="Create Sub Category"
      description="Add a new subcategory to add to the category."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-8 py-2 pb-4">
          <div className="space-y-5">
            <Form {...subCategoryForm}>
              <form onSubmit={subCategoryForm.handleSubmit(onSubmit)}>
                <FormField
                  control={subCategoryForm.control}
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
                  control={subCategoryForm.control}
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
                  control={subCategoryForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Image URL"
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
                    type="button"
                    variant="outline"
                    onClick={storeModal.onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => console.log(formState.errors)}
                    disabled={loading}
                    type="submit"
                  >
                    Create Subcategory
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
