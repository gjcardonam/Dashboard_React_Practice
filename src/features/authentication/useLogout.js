import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending: isLoading } = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        },
        onError: (error) => {
            console.error(error);
        }
    });

    return { logout, isLoading };
}