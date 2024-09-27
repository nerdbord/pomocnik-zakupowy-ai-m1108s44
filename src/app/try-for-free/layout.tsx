import Header from "@/components/chat/Header";
import { ChatProvider } from "@/context/ChatContext";

export default function TryForFreeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ChatProvider>
      <Header />
      {children}
    </ChatProvider>
  );
}
