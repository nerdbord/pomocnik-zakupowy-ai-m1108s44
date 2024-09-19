import SingleChat from "@/app/components/chat/SingleChat";
import { Header } from "@/app/components/Header";
import React from "react";

export default function ChatPage({ params }: { params: { chatId: string } }) {
  return (
    <div>
      <Header />
      <SingleChat chatId={params.chatId} />
    </div>
  );
}
