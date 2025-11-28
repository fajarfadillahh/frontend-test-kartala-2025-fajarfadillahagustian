import SectionUserList from "@/components/sections/SectionUserList";
import { Suspense } from "react";

export default function UsersPage() {
  return (
    <Suspense fallback={<p className="text-center italic">Loading...</p>}>
      <SectionUserList />
    </Suspense>
  );
}
