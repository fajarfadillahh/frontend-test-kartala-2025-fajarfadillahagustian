"use client";

import { getUsers } from "@/services/users/getUsers";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [name, setName] = useState<string>("");
  const [debounced, setDebounced] = useState<string>("");

  const { data: users, isLoading } = getUsers(debounced);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounced(name);
    }, 800);

    return () => {
      clearTimeout(handleDebounce);
    };
  }, [name]);

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

        <ul className="grid list-disc gap-2">
          {isLoading ? (
            <p>Loading...</p>
          ) : users?.length ? (
            users?.map((user) => (
              <li key={user.id} className="pl-4">
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
