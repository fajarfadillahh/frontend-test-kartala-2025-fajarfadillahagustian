"use client";

import Layout from "@/components/Layout";
import { useDebounce } from "@/hooks/useDebounce";
import { getUsers } from "@/services/users/getUsers";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultSearch = searchParams.get("name") ?? "";

  const [name, setName] = useState<string>(defaultSearch);
  const { debounced } = useDebounce(name);

  const { data: users, isLoading } = getUsers(debounced);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debounced) {
      params.set("name", debounced);
    }

    router.replace(`?${params.toString()}`);
  }, [debounced, router]);

  const tableHead = ["Name", "Email", "City", "Company Name", "Action"];

  return (
    <Layout className="relative pt-16 pb-32">
      <section className="grid gap-16">
        <h1 className="text-center text-3xl font-bold">Users data</h1>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Search user by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[500px] rounded-xl border border-stone-400 bg-stone-200 p-2 text-stone-900 placeholder:font-medium placeholder:text-stone-500 placeholder:italic focus:outline-stone-900"
          />

          <div className="overflow-hidden overflow-x-scroll rounded-xl border border-stone-400 xl:overflow-x-hidden">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  {tableHead.map((th, index) => (
                    <th
                      key={index}
                      className="min-w-[150px] border-r border-stone-400 bg-stone-300 p-3 text-left font-semibold last:border-none"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-16 italic lg:text-center"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : users?.length ? (
                  users?.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-stone-400 font-normal"
                    >
                      <td className="min-w-[250px] border-r border-stone-400 p-3">
                        <Link
                          href={`/users/${user.id}`}
                          className="hover:underline"
                        >
                          {user.name}
                        </Link>
                      </td>
                      <td className="min-w-[250px] border-r border-stone-400 p-3">
                        {user.email}
                      </td>
                      <td className="min-w-[250px] border-r border-stone-400 p-3">
                        {user.address.city}
                      </td>
                      <td className="min-w-[250px] border-r border-stone-400 p-3">
                        {user.company.name}
                      </td>
                      <td className="min-w-[150px] p-3">
                        <Link
                          href={`/users/${user.id}`}
                          className="rounded-xl bg-stone-200 p-[.5rem_1.3rem] text-stone-900 transition-all hover:bg-stone-400"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-16 italic lg:text-center"
                    >
                      User not found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
