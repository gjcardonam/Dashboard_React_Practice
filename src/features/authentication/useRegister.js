import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUser } from "../../services/apiAuth";

export const useRegister = () => {
  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success(
        "Cuenta creada con exito"
      );
    },
    onError: () => {
      toast.error(
        "Error al crear la cuenta"
      )
    }
  });

  return { registerUser, isLoading };
};