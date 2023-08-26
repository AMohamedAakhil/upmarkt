"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/trpc/client";
import { productSchema } from "@/server/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, subCategorySchema, subSubCategorySchema } from "@/server/api/types";
type categoryType = z.infer<typeof categorySchema>;
type subCategoryType = z.infer<typeof subCategorySchema>;
type subSubCategoryType = z.infer<typeof subSubCategorySchema>;

import * as z from "zod";
import { useForm } from "react-hook-form";

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
import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const ProductForm = () => {
  const {theme} = useTheme();
  const form = useForm<z.infer<typeof productSchema>>({
    // resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("submitted");
    console.log(values);
  }
  const [categories, setCategories] = useState<categoryType[] | undefined | null>(null);
  const [subCategories, setSubCategories] = useState<subCategoryType[] | undefined | null>();
  const [subSubCategories, setSubSubCategories] = useState<subSubCategoryType[] | undefined | null>();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");


  useEffect(() => {
    const getCategories = async() => {
      const categoriesRes = await api.category.getCategories.query();
      setCategories(categoriesRes);
    }

    const getSubCategories = async() => {
      const subCategoriesRes = await api.category.getSubCategories.query();
      setSubCategories(subCategoriesRes);
    }

    const getSubSubCategories = async() => {
      const subSubCategoriesRes = await api.category.getSubSubCategories.query();
      setSubSubCategories(subSubCategoriesRes);
    }
    getCategories();
    getSubCategories();
    getSubSubCategories();
  }, []);

  console.log(categories)
  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="originType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Origin Type of Product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={theme == "light" ? "bg-white" : "bg-black"}>
                        <SelectItem value="In house">
                          In house
                        </SelectItem>
                        <SelectItem value="seller">
                          Seller
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Origin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="warranty"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Warranty</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Warranty Details"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <Button
                className={theme == "light" ? "bg-black text-white hover:bg-slate-800 rounded-lg" : "bg-white text-black hover:bg-slate-300"}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
