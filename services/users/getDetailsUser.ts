import { api } from "@/lib/axios";
import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export function getDetailsUser(userId: string) {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
}
