import { api } from "@/lib/axios";
import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export function getUsers(name?: string) {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get("/users");
      return response.data;
    },
    select: (data) => {
      if (!name) return data;

      return data.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    },
  });
}
