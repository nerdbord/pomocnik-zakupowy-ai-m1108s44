"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { HamburgerButton } from "../HamburgerButton";
import { LogoButton } from "../LogoButton";
import { useChatContext } from "@/app/context/ChatContext";

export default function Header() {
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const { setNewChat } = useChatContext();

  return (
    <header className="fixed left-0 top-0 z-40 flex h-header-height w-full items-center bg-white shadow-md">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:container">
        <LogoButton />
        <div className="flex items-center gap-6 md:hidden">
          <button
            onClick={() => {
              setNewChat(true); 
            }}
            className="btn"
          >
            Nowy czat
          </button>
          <HamburgerButton
            onClick={() => setIsAsideOpen(!isAsideOpen)}
            className="relative z-50"
          />
        </div>
        <div className="hidden md:block">
          <button
            onClick={() => {
              setNewChat(true); 
            }}
            className="btn mr-4"
          >
            Nowy czat
          </button>
          <UserButton />
        </div>
      </div>
      <aside
        className={`fixed right-0 top-0 z-40 flex min-h-dvh w-64 flex-col items-center bg-white p-4 shadow-lg transition-transform ${
          isAsideOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <UserButton />
      </aside>
    </header>
  );
}
