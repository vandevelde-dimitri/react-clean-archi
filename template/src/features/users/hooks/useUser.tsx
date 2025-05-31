import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/userService";

export const useUser = (id: string) => {
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => getUser(id),
        enabled: !!id,
    });
};
