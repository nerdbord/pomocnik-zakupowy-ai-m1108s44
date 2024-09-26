"use client";

import { ChatSection } from "@/components/chat/ChatSection";

export const Chat = () => {
  return (
    <section className="flex h-full flex-col justify-between gap-10 pt-6 md:flex-row xl:gap-20">
      <ChatSection />
    </section>
  );
};
