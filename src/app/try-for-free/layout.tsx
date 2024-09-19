"use client";

import { HamburgerButton } from "@/components/HamburgerButton";
import { LogoButton } from "@/components/LogoButton";
import { useChatStore } from "@/store/chatStore";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function TryForFreeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const { addNewChat } = useChatStore();

  return (
    <div>
      <header className="h-header-height fixed left-0 top-0 z-40 flex w-full items-center bg-white shadow-md">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:container">
          <LogoButton />
          <div className="flex items-center gap-6 md:hidden">
            <button className="btn">Nowy czat</button>
            <HamburgerButton
              onClick={() => setIsAsideOpen(!isAsideOpen)}
              className="relative z-50"
            />
          </div>
          <div className="hidden md:block">
            <button
              className="btn mr-4"
              onClick={() =>
                addNewChat()
              }
            >
              Nowy czat
            </button>
            <UserButton />
          </div>
        </div>
        <aside
          className={`fixed right-0 top-0 z-40 flex min-h-dvh w-64 flex-col items-center bg-white p-4 shadow-lg transition-transform ${isAsideOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
        >
          <UserButton />
        </aside>
      </header>
      {children}
    </div>
  );
}
