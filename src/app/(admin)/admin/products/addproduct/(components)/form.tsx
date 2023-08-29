"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/trpc/client";
import { productFormSchema } from "@/server/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { useAttribute } from "@/hooks/use-attributes";
import { Chips } from "primereact/chips";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import MultipleImageUpload from "@/components/ui/multiple-image-upload";
import ImageUpload from "@/components/ui/image-upload";
import "primereact/resources/primereact.min.css";
import { AttributeModal } from "@/components/modals/attribute-modal";
import { AttributeModalProvider } from "@/providers/attribute-modal-provider";
import { useAttributeModal } from "@/hooks/use-attribute-modal";

const ProductForm = () => {
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      originType: "",
      name: "",
      description: "",
      warranty: "",
      categoryId: "",
      productCode: "",
      brand: "",
      unit: "",
      unitPrice: "0",
      purchasePrice: "0",
      tax: "0",
      discount: "0",
      typeOfDiscount: "",
      totalQuantity: "0",
      minimumQuantity: "0",
      shippingCost: "0",
      deliveryDuration: "",
      shippingCostMultiplyByQuantity: "",
      metaTitle: "",
      metaDescription: "",
      metaImageUrl: "",
      youtubeLink: "",
      thumbnailUrl: "",
      images: [],
      subCategoryId: "",
    },
  });

  const { watch, setValue, getValues } = form;
  const categoryId = watch("categoryId");
  const attributesId = watch("attributesId");
  const onCategoryOpen = useCategoryModal((state) => state.onOpen);
  const onSubcategoryOpen = useSubCategoryModal((state) => state.onOpen);
  const onAttributeOpen = useAttributeModal((state) => state.onOpen);
  const onBrandOpen = useBrandModal((state) => state.onOpen);

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    setLoading(true);
    const {
      originType,
      name,
      description,
      warranty,
      categoryId,
      productCode,
      brand,
      unit,
      unitPrice,
      purchasePrice,
      tax,
      discount,
      typeOfDiscount,
      totalQuantity,
      minimumQuantity,
      shippingCost,
      deliveryDuration,
      shippingCostMultiplyByQuantity,
      metaTitle,
      metaDescription,
      metaImageUrl,
      youtubeLink,
      thumbnailUrl,
      images,
      subCategoryId,
    } = values;

    const acceptedValues = {
      originType,
      name,
      description,
      warranty,
      categoryId,
      productCode,
      brandId: brand,
      unit,
      unitPrice: parseInt(unitPrice === undefined ? "0" : unitPrice),
      purchasePrice: parseInt(purchasePrice || "0"),
      tax: parseInt(tax || "0"),
      discount: parseInt(discount || "0"),
      typeOfDiscount,
      totalQuantity: parseInt(totalQuantity || "0"),
      minimumQuantity: parseInt(minimumQuantity || "0"),
      shippingCost: parseInt(shippingCost || "0"),
      deliveryDuration,
      shippingCostMultiplyByQuantity,
      metaTitle,
      metaDescription,
      metaImageUrl,
      youtubeLink,
      thumbnailUrl,
      images,
      subCategoryId,
    };

    const productRes = await api.product.create.mutate(acceptedValues);
    // ✅ This will be type-safe and validated.
    console.log("Product Res", productRes);
    console.log("submitted");
    console.log(values);
    setLoading(false);
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
  const [loading, setLoading] = useState(false);

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

  const [attributesArray, setAttributesArray] = useState<String[]>([]);

  useEffect(() => {
    const combinedArray = ([] as string[]).concat(
      ...(Object.values(attributeValues) as string[][])
    );
    setAttributesArray(combinedArray);
  }, [attributeValues]);

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

      <Card>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>
            Fill the form below to add a new product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Info</CardTitle>
                  <CardDescription>
                    Basic information about the product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
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
                            className={
                              theme == "light" ? "bg-white" : "bg-black"
                            }
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
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Category and Brand Info</CardTitle>
                  <CardDescription>
                    Quick create categories, subcategories and brands.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <Select
                          required
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category of Product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className={
                              theme == "light" ? "bg-white" : "bg-black"
                            }
                          >
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
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
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
                                {subCategories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
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
                                    Math.floor(
                                      10000000 + Math.random() * 90000000
                                    )
                                  )
                                );
                              }}
                            >
                              (Generate Code)
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Enter Product Code"
                              {...field}
                            />
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
                            className={
                              theme == "light" ? "bg-white" : "bg-black"
                            }
                          >
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
                            {brands.map((brand) => (
                              <SelectItem key={brand.id} value={brand.id}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Attributes</CardTitle>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={onAttributeOpen}
                    >
                      Create New Attribute
                    </Button>
                  </div>
                  <CardDescription>
                    Select attributes, and add attribute values. Press Enter or
                    add a "," to create new attribute values
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <AttributeModalProvider />
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
                            <div>
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
                                filter
                                placeholder="Select Attributes"
                                maxSelectedLabels={3}
                                className="md:w-20rem w-full"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />

                  {selectedAttributes ? (
                    <section className="grid grid-cols-4 gap-5">
                      {selectedAttributes.map((attribute) => (
                        <FormField
                          key={attribute.id}
                          control={form.control}
                          name={`attributeValues.${attribute.id}`}
                          render={({ field, fieldState }) => (
                            <span className="p-float-label card p-fluid">
                              <Chips
                                id={field.name}
                                name="chipArray"
                                allowDuplicate={false}
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
                              <label htmlFor={field.name}>
                                {attribute.name}
                              </label>
                            </span>
                          )}
                        />
                      ))}
                    </section>
                  ) : (
                    <></>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Info</CardTitle>
                  <CardDescription>
                    All pricing related info such as unit price, tax, discounts,
                    etc
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-8">
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
                            className={
                              theme == "light" ? "bg-white" : "bg-black"
                            }
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
                            <Input
                              placeholder="Enter Purchase Price"
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
                            className={
                              theme == "light" ? "bg-white" : "bg-black"
                            }
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
                    name="totalQuantity"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <div className="flex space-x-2">
                            <FormLabel>Total Quantity</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Enter Total Quantity"
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
                    name="minimumQuantity"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <div className="flex space-x-2">
                            <FormLabel>Minimum Order Quantity</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Enter Minimum Order Quantity"
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
                    name="shippingCost"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <div className="flex space-x-2">
                            <FormLabel>Shipping Cost</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Enter Shipping Cost"
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
                    name="deliveryDuration"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <div className="flex space-x-2">
                            <FormLabel>Delivery Duration</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Enter Delivery Duration"
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
                    name="shippingCostMultiplyByQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Shipping Cost Multiply with Quantity
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select shipping cost multiply with quantity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className={
                              theme == "light" ? "bg-white" : "bg-black"
                            }
                          >
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meta Info</CardTitle>
                  <CardDescription>
                    Meta information about the product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <div className="flex space-x-2">
                            <FormLabel>Meta Title</FormLabel>
                          </div>
                          <FormControl>
                            <Input placeholder="Enter Meta Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <div className="flex space-x-2">
                            <FormLabel>Meta Description</FormLabel>
                          </div>
                          <FormControl>
                            <Textarea
                              placeholder="Enter Meta Description"
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
                    name="metaImageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Image</FormLabel>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Media</CardTitle>
                  <CardDescription>Product's images and videos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="youtubeLink"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <div className="flex space-x-2">
                            <FormLabel>Youtube Link</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Enter Youtube Link"
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
                    name="thumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail Image</FormLabel>
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
                    name="images" // Use plural to indicate multiple URLs
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Images</FormLabel>
                        <FormControl>
                          <MultipleImageUpload
                            value={field.value || []}
                            disabled={loading}
                            onChange={(urls) => field.onChange(urls)} // Update the value to an array of URLs
                            onRemove={(urlToRemove) =>
                              field.onChange(
                                field.value!.filter(
                                  (url) => url !== urlToRemove
                                )
                              )
                            } // Remove the specified URL from the array
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button
                className={
                  theme == "light"
                    ? "w-full rounded-lg bg-black text-white hover:bg-slate-800"
                    : "w-full bg-white text-black hover:bg-slate-300"
                }
                type="submit"
              >
                Create Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
