import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductAPI } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isPending: isDeliting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeliting, deleteProduct };
}
