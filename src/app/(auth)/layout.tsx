import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-[280px]">{children}</div>
    </main>
  );
}
