import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCategory } from "../../services/apiCategories";

export function useCreateCategory() {

const queryClient = useQueryClient();

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: createEditCategory,
    onSuccess: () => {
      toast.success("Categoría creada con éxito");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error("Ocurrió un error. Por favor intenta de nuevo.");
      console.error(error);
    },
  });

    return { isCreating, createCategory };
}