import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryAPI } from "../../services/apiCategories";
import toast from "react-hot-toast";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeliting, mutate: deleteCategory } = useMutation({
    mutationFn: deleteCategoryAPI,
    onSuccess: () => {
      toast.success("Categorias eliminadas con éxito");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeliting, deleteCategory };
}
