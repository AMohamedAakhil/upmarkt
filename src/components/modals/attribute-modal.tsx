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
import { Attribute } from "@prisma/client";
import { shallow } from "zustand/shallow";
import { useAttribute } from "@/hooks/use-attributes";
import { useAttributeModal } from "@/hooks/use-attribute-modal";

export const AttributeModal = () => {
  const storeModal = useAttributeModal();
  const { toast } = useToast();
  const setAttributes = useAttribute((state) => state.setAttributes, shallow);
  const attributes = useAttribute((state) => state.attributes, shallow);

  const [loading, setLoading] = useState(false);

  const attributeSchema = z.object({
    name: z.string().min(1, "Name is required"),
  });

  const form = useForm<Attribute>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: "",
    },
  });
  const { formState, setValue } = form;

  const onSubmit = async (values: Attribute) => {
    try {
      setLoading(true);
      const response = await api.misc.createAttribute.mutate(values);
      setAttributes([...attributes, response]);
      console.log(response);
      storeModal.onClose();
      toast({
        title: `Created Attribute: ${values.name}`,
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
    }
  };

  return (
    <Modal
      title="Create Attribute"
      description="Add a new attribute to the store."
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
                      <FormLabel>Attribute Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Enter Attribute Name"
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
                    Create Attribute
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
