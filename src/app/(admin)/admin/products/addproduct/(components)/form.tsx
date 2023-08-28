"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/trpc/client";
import { productSchema } from "@/server/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { classNames } from "primereact/utils";
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
import { ModalProvider } from "@/providers/modal-provider";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { useSubCategoryModal } from "@/hooks/use-sub-category-modal";
import { SubCategoryModalProvider } from "@/providers/sub-category-modal-provider";
import { useCategory } from "@/hooks/use-categories";
import { useSubcategory } from "@/hooks/use-subcategories";
import { BrandModalProvider } from "@/providers/brand-modal-provider";
import { useBrand } from "@/hooks/use-brands";
import { useBrandModal } from "@/hooks/use-brand-modal";
import { Plus } from "lucide-react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import "primereact/resources/primereact.min.css";
import { useAttribute } from "@/hooks/use-attributes";
import { Chips } from "primereact/chips";
import { Editor, EditorTextChangeEvent } from "primereact/editor";

const ProductForm = () => {
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof productSchema>>({
    // resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
    },
  });
  const { watch, setValue, getValues } = form;
  const categoryId = watch("categoryId");
  const attributesId = watch("attributesId");
  const onCategoryOpen = useCategoryModal((state) => state.onOpen);
  const onSubcategoryOpen = useSubCategoryModal((state) => state.onOpen);

  const onBrandOpen = useBrandModal((state) => state.onOpen);

  function onSubmit(values: z.infer<typeof productSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("submitted");
    console.log(values);
  }
  const categories = useCategory((state) => state.categories);
  const setCategories = useCategory((state) => state.setCategories);
  const subCategories = useSubcategory((state) => state.subcategories);
  const setSubCategories = useSubcategory((state) => state.setSubcategories);
  const brands = useBrand((state) => state.brands);
  const setBrands = useBrand((state) => state.setBrands);
  const attributes = useAttribute((state) => state.attributes);
  const setAttributes = useAttribute((state) => state.setAttributes);
  const selectedAttributes = useAttribute((state) => state.selectedAttributes);
  const setSelectedAttributes = useAttribute(
    (state) => state.setSelectedAttributes
  );
  const [attributeValues, setAttributeValues] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      const categoriesRes = await api.category.getCategories.query();
      setCategories(categoriesRes);
      console.log(categories);
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getSubCategories = async () => {
      const subCategoriesRes = await api.category.getSubCategories.query({
        categoryId: categoryId ? categoryId : "",
      });
      setSubCategories(subCategoriesRes);
      console.log(subCategories);
    };

    getSubCategories();
  }, [categoryId]);

  useEffect(() => {
    const getBrands = async () => {
      const brandsRes = await api.misc.getBrands.query();
      setBrands(brandsRes);
      console.log(brands);
    };

    const getAttributes = async () => {
      const attributesRes = await api.misc.getAttributes.query();
      setAttributes(attributesRes);
      console.log("Attri", attributesRes);
    };

    getBrands();
    getAttributes();
  }, []);

  return (
    <div className="">
      <ModalProvider />
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
                      <SelectContent
                        className={theme == "light" ? "bg-white" : "bg-black"}
                      >
                        <SelectItem value="In house">In house</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
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
                        <Editor
                          id={field.name}
                          name="blog"
                          value={field.value}
                          onTextChange={(e: EditorTextChangeEvent) =>
                            field.onChange(e.textValue)
                          }
                          style={{ height: "320px" }}
                        />
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
                        <Editor
                          id={field.name}
                          name="warranty"
                          value={field.value}
                          onTextChange={(e: EditorTextChangeEvent) =>
                            field.onChange(e.textValue)
                          }
                          style={{ height: "320px" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category of Product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className={theme == "light" ? "bg-white" : "bg-black"}
                      >
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}

                        <Button
                          onClick={onCategoryOpen}
                          className={
                            theme === "light"
                              ? "w-full bg-white text-black hover:bg-slate-100"
                              : "w-full bg-black text-white hover:bg-slate-900"
                          }
                        >
                          <Plus className="mr-3" />
                          Create New Category
                        </Button>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {categoryId ? (
                <>
                  <SubCategoryModalProvider categoryId={categoryId} />
                  <FormField
                    control={form.control}
                    name="subCategoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Subcategory</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Subcategory of Product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className={
                              theme == "light" ? "bg-white" : "bg-black"
                            }
                          >
                            {subCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                            <Button
                              onClick={onSubcategoryOpen}
                              className={
                                theme === "light"
                                  ? "w-full bg-white text-black hover:bg-slate-100"
                                  : "w-full bg-black text-white hover:bg-slate-900"
                              }
                            >
                              <Plus className="mr-3" />
                              Create New Subcategory
                            </Button>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <></>
              )}

              <FormField
                control={form.control}
                name="productCode"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <div className="flex space-x-2">
                        <FormLabel>Product Code</FormLabel>
                        <FormLabel
                          className="text-blue-600"
                          onClick={() => {
                            setValue(
                              "productCode",
                              String(
                                Math.floor(10000000 + Math.random() * 90000000)
                              )
                            );
                          }}
                        >
                          (Generate Code)
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="Enter Product Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <BrandModalProvider />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Brand of Product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className={theme == "light" ? "bg-white" : "bg-black"}
                      >
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}

                        <Button
                          onClick={onBrandOpen}
                          className={
                            theme === "light"
                              ? "w-full bg-white text-black hover:bg-slate-100"
                              : "w-full bg-black text-white hover:bg-slate-900"
                          }
                        >
                          <Plus className="mr-3" />
                          Create New Brand
                        </Button>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Unit Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className={theme == "light" ? "bg-white" : "bg-black"}
                      >
                        <SelectItem value="Kg">Kg</SelectItem>
                        <SelectItem value="Pc">Pc</SelectItem>
                        <SelectItem value="Gms">Gms</SelectItem>
                        <SelectItem value="Ltrs">Ltrs</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attributesId"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <div className="flex space-x-2">
                        <FormLabel>Attributes</FormLabel>
                      </div>
                      <FormControl>
                        <MultiSelect
                          id={field.name}
                          name="value"
                          value={field.value}
                          options={attributes}
                          onChange={(e: MultiSelectChangeEvent) => {
                            field.onChange(e.value),
                              setSelectedAttributes(e.value);
                          }}
                          optionLabel="name"
                          display="chip"
                          placeholder="Select Attributes"
                          maxSelectedLabels={3}
                          className="md:w-20rem w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              {selectedAttributes ? (
                <div>
                  {selectedAttributes.map((attribute) => (
                    <FormField
                      key={attribute.id} // Make sure to use a unique key
                      control={form.control}
                      name={`attributeValues.${attribute.id}`} // Use attribute ID as part of the field name
                      render={({ field, fieldState }) => (
                        <>
                          <FormItem>
                            <FormLabel>{attribute.name}</FormLabel>
                            <FormControl>
                              <Chips
                                id={field.name}
                                name="chipArray"
                                separator=","
                                className={classNames({
                                  "p-invalid": fieldState.error,
                                })}
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e.value);
                                  setAttributeValues((prevValues) => ({
                                    ...prevValues,
                                    [attribute.id]: e.value,
                                  }));
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}

              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <div className="flex space-x-2">
                        <FormLabel>Unit Price</FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="Enter Unit Price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <div className="flex space-x-2">
                        <FormLabel>Purchase Price</FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="Enter Purchase Price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <div className="flex space-x-2">
                        <FormLabel>Tax</FormLabel>
                        <FormLabel className="text-blue-600">
                          (Percent %)
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter Tax"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <div className="flex space-x-2">
                        <FormLabel>Discount</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter Discount"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="typeOfDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Discount Unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className={theme == "light" ? "bg-white" : "bg-black"}
                      >
                        <SelectItem value="Flat">Flat</SelectItem>
                        <SelectItem value="Percent">Percent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <div className="flex space-x-2">
                        <FormLabel>Discount</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter Discount"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <Button
                className={
                  theme == "light"
                    ? "rounded-lg bg-black text-white hover:bg-slate-800"
                    : "bg-white text-black hover:bg-slate-300"
                }
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
