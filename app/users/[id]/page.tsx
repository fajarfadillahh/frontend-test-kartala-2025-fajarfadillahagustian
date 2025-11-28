"use client";

import Layout from "@/components/Layout";
import { getPostsUser } from "@/services/posts/getPostsUser";
import { getDetailsUser } from "@/services/users/getDetailsUser";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: user, isLoading } = getDetailsUser(id);
  const { data: posts } = getPostsUser(id);

  const tableHead = ["No.", "Title", "Body"];

  return (
    <Layout className="relative pt-16 pb-32">
      <section className="grid gap-10">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Details User data
        </h1>

        <div className="grid gap-4">
          <Link
            href="/"
            className="w-max rounded-xl bg-stone-200 p-[.5rem_1.3rem] text-stone-900 transition-all hover:bg-stone-400"
          >
            Back to home
          </Link>

          <div className="flex flex-wrap items-start gap-8 overflow-hidden rounded-xl border border-stone-400 bg-stone-300 p-8">
            {isLoading ? (
              <div className="w-full text-center italic">Loading...</div>
            ) : (
              <>
                <Image
                  src="/user-circle-duotone.svg"
                  alt="user icon"
                  width={100}
                  height={100}
                  className="size-24 text-stone-900"
                />

                <div className="grid items-start gap-x-8 gap-y-4 lg:grid-cols-2">
                  {[
                    ["Name", user?.name],
                    ["Email", user?.email],
                    ["City", user?.address.city],
                    ["Company Name", user?.company.name],
                  ].map(([key, value], index) => (
                    <div key={index} className="grid">
                      <span className="text-sm font-medium">{key}:</span>
                      <h3 className="truncate text-lg font-semibold">
                        {value}
                      </h3>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">User post</h2>

          <div className="overflow-hidden overflow-x-scroll rounded-xl border border-stone-400 xl:overflow-x-hidden">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  {tableHead.map((th, index) => (
                    <th
                      key={index}
                      className="border-r border-stone-400 bg-stone-300 p-3 text-left font-semibold last:border-none"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-16 text-center italic">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  posts?.map((post, index) => (
                    <tr
                      key={post?.id}
                      className="border-t border-stone-400 font-normal"
                    >
                      <td className="border-r border-stone-400 p-3">
                        {index + 1}
                      </td>
                      <td className="min-w-[250px] border-r border-stone-400 p-3 capitalize">
                        {post?.title}
                      </td>
                      <td className="min-w-[500px] p-3">{post?.body}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
