import { HTMLAttributes, ReactNode } from "react";

type LayoutProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
};

export default function Layout({ children, className }: LayoutProps) {
  return (
    <main className="relative overflow-hidden">
      <div className="-top-[250px] -left-[250px] hidden size-[500] rounded-full bg-orange-400/20 blur-[120px] lg:absolute lg:flex"></div>

      <div
        className={`mx-auto h-full min-h-screen w-full max-w-[1200px] px-4 lg:px-0 ${className}`}
      >
        {children}
      </div>
    </main>
  );
}
