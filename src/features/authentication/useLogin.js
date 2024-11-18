import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { login as LoginAPI } from "../../services/apiAuth"
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ username, password }) => LoginAPI({ username, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);
            if(user?.roles.includes("ROLE_USER")) navigate("/products", { replace: true })
            else navigate("/users", { replace: true });
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message);
        }
    })

    return { login, isPending }
}