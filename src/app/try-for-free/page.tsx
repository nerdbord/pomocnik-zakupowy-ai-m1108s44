import { Chat } from "@/components/chat/Chat";
import Header from "@/components/chat/Header";
import { ChatProvider } from "../context/ChatContext";

export default function TryForFree() {
  return (
    <ChatProvider>
      <main className="mx-auto h-dvh min-h-dvh max-w-7xl px-4 pb-20 pt-header-height md:container xl:px-16">
        <Header />
        <Chat />
      </main>
    </ChatProvider>
  );
}
