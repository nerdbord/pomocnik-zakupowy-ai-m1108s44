/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ChatSection } from "@/components/chat/ChatSection";
import { ChatHistorySection } from "@/components/chat/ChatHistorySection";

export const Chat = () => {
  return (
    <section className="flex h-full flex-col justify-between gap-10 pt-6 md:flex-row xl:gap-20">
      {/* <ChatHistorySection /> */}
      <ChatSection />
      {/* <ChatTopSection startNewChat={startNewChat} /> */}
    </section>
  );
};
