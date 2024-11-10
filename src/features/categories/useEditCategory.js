import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCategory } from "../../services/apiCategories";
import toast from "react-hot-toast";

export function useEditCategory() {
  const queryClient = useQueryClient();

  const { mutate: editCategory, isPending: isEditing } = useMutation({
    mutationFn: ({ newCategoryData, id }) => createEditCategory(newCategoryData, id),
    onSuccess: () => {
      toast.success("Categoría editada con éxito");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error("Ocurrió un error. Por favor intenta de nuevo.");
      console.error(error);
    },
  });

    return { isEditing, editCategory };
}