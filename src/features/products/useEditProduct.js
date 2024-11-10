import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useEditProduct() {
    const queryClient = useQueryClient();

  const { mutate: editProduct, isPending: isEditing } = useMutation({
    mutationFn: ({ newProductData, id }) => createEditProduct(newProductData, id),
    onSuccess: () => {
      toast.success("Product successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    },
  });

    return { isEditing, editProduct };
}