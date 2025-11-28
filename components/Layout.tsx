import { HTMLAttributes, ReactNode } from "react";

type LayoutProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
};

export default function Layout({ children, className }: LayoutProps) {
  return (
    <main
      className={`mx-auto h-full min-h-screen w-full max-w-[1200px] px-4 lg:px-0 ${className}`}
    >
      {children}
    </main>
  );
}
