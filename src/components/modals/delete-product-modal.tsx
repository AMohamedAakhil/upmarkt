"use client";

import { useState } from "react";
import { api } from "@/trpc/client";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useDeleteModal } from "@/hooks/use-delete-modal";

export const DeleteProductModal = ({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) => {
  const storeModal = useDeleteModal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: string) => {
    try {
      setLoading(true);
      const response = await api.product.delete.query(values);
      console.log(response);
      storeModal.onClose();
      toast({
        title: `Deleted Product: ${productName}`,
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
      title="Delete Product"
      description="This action will permanently delete the product."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-8 py-2 pb-4">
          <div className="space-y-5">
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
                onClick={() => onSubmit(productId)}
                type="submit"
              >
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
