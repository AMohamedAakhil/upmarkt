"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/trpc/client";
import { productFormSchema, productSchema } from "@/server/api/types";
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
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { Image } from "@prisma/client";

const EditProductForm = ({productId, previousFormValues} : {productId: string, previousFormValues: any}) => {
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: previousFormValues.name ? previousFormValues.name : "",
      description: previousFormValues.description ? previousFormValues.description : "",
      warranty: previousFormValues.warranty ? previousFormValues.warranty : "",
      categoryId: previousFormValues.categoryId ? previousFormValues.categoryId : "",
      productCode: previousFormValues.productCode ? previousFormValues.productCode : "",
      brandId: previousFormValues.brandId ? previousFormValues.brandId : "",
      unit: previousFormValues.unit  ? previousFormValues.unit : "",
      unitPrice: String(previousFormValues.unitPrice ? previousFormValues.unitPrice : ""),
      purchasePrice: String(previousFormValues.purchasePrice),
      tax: String(previousFormValues.tax ? previousFormValues.tax : ""),
      discount: String(previousFormValues.discount),
      typeOfDiscount: previousFormValues.typeOfDiscount ? previousFormValues.typeOfDiscount : "",
      totalQuantity: String(previousFormValues.totalQuantity ? previousFormValues.totalQuantity : ""),
      minimumQuantity: String(previousFormValues.minimumQuantity ? previousFormValues.minimumQuantity : ""),
      shippingCost: String(previousFormValues.shippingCost ? previousFormValues.shippingCost : ""),
      deliveryDuration: previousFormValues.deliveryDuration ? previousFormValues.deliveryDuration : "",
      shippingCostMultiplyByQuantity: previousFormValues.shippingCostMultiplyByQuantity ? "yes" : "no",
      metaTitle: previousFormValues.metaTitle ? previousFormValues.metaTitle : "",
      metaDescription: previousFormValues.metaDescription ? previousFormValues.metaDescription : "",
      metaImageUrl: previousFormValues.metaImageUrl ? previousFormValues.metaImageUrl : "",
      youtubeLink: previousFormValues.youtubeLink ? previousFormValues.youtubeLink : "",
      thumbnailUrl: previousFormValues.thumbnailUrl ? previousFormValues.thumbnailUrl : "",
      images: previousFormValues.images ? [...previousFormValues.images.map((item: any) => item.url)] : [],
      subCategoryId: previousFormValues.subCategoryId ? previousFormValues.subCategoryId : "",
    },
  });

  console.log("Previous form state", previousFormValues)

  const { watch, setValue } = form;
  const categoryId = watch("categoryId");
  const onCategoryOpen = useCategoryModal((state) => state.onOpen);
  const onSubcategoryOpen = useSubCategoryModal((state) => state.onOpen);
  const onAttributeOpen = useAttributeModal((state) => state.onOpen);
  const onBrandOpen = useBrandModal((state) => state.onOpen);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    setLoading(true);
    const {
      name,
      description,
      warranty,
      categoryId,
      productCode,
      brandId,
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
      attributeValues,
    } = values;

    const acceptedValues = {
      id: productId,
      name,
      description,
      warranty,
      categoryId,
      productCode,
      brandId: brandId,
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
      attributesId: attributes.map((item: {id: string}) => item.id),
      attributeValues,
    };

    const productRes = await api.product.update.mutate(acceptedValues);
    console.log("Product Res", productRes);
    console.log("submitted");
    console.log(values);
    router.push("/admin/products");
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
    };

    const getBrands = async () => {
      const brandsRes = await api.misc.getBrands.query();
      setBrands(brandsRes);
    };

    const getAttributes = async () => {
      const attributesRes = await api.misc.getAttributes.query();
      setAttributes(attributesRes);      
    };

    getBrands();
    getAttributes();
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

      {!loading ? <>
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
                    name="name"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Product Name" {...field} />
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
                    name="brandId"
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
  render={({ field, formState: {errors} }) => (
    <>
      <FormItem>
        <div className="flex space-x-2">
          <FormLabel>Attributes</FormLabel>
        </div>
        <FormControl>
            <MultiSelect
              id={field.name}
              name="attributesId"
              value={field.value}
              options={attributes}
              onChange={(e: MultiSelectChangeEvent) => {
                field.onChange(e.value); // Update the field value with the list of names
                setSelectedAttributes(e.value); // Update other states
                console.log(e.value);
              }}
              optionLabel="name"
              display="chip"
              filter
              placeholder="Select Attributes"
              className="md:w-20rem w-full"
            />
        </FormControl>
        <FormMessage onError={(e) => console.log(e)} />
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
                            existingUrls={previousFormValues.images}
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
                Update Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      </> : 
      <>
          <div
            className={
              theme === "light"
                ? "flex h-screen w-full items-center justify-center bg-slate-200"
                : "flex h-screen w-full items-center justify-center bg-slate-900"
            }
          >
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 inline h-10 w-10 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>}


    </div>
  );
};

export default EditProductForm;