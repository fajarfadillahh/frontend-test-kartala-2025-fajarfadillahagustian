import { api } from "@/lib/axios";
import { Post } from "@/types/post.type";
import { useQuery } from "@tanstack/react-query";

export function getPostsUser(userId: string) {
  return useQuery<Post[]>({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const response = await api.get(`/posts?userId=${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
}
