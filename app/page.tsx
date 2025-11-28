"use client";

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

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="grid gap-8">
        <input
          type="text"
          placeholder="Search user by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-stone-200 p-2"
        />

        <ul className="grid list-disc gap-2 pl-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : users?.length ? (
            users?.map((user) => (
              <li key={user.id}>
                <Link href={`/users/${user.id}`} className="hover:underline">
                  {user.name}
                </Link>
              </li>
            ))
          ) : (
            <span>user tidak ditemukan!</span>
          )}
        </ul>
      </div>
    </div>
  );
}
