"use client";

import { getPostsUser } from "@/services/posts/getPostsUser";
import { getDetailsUser } from "@/services/users/getDetailsUser";
import { use } from "react";

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: user, isLoading } = getDetailsUser(id);
  const { data: posts } = getPostsUser(id);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-12">
          <div>{user?.name}</div>

          <div className="grid gap-4">
            <h2 className="text-xl font-bold">User Post:</h2>

            <ul className="grid list-disc gap-2 pl-4">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                posts?.map((post) => <li key={post.id}>{post.title}</li>)
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
