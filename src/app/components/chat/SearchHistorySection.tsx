import { ChatHistory } from "@/app/components/chat/types";
import NextImage from "next/image";
import Link from "next/link";

export const SearchHistorySection = ({
  chatHistories,
  selectChat,
  currentChatId,
}: {
  chatHistories: ChatHistory[];
  selectChat: (chatId: string) => void;
  currentChatId: string | null;
}) => {
  const getChatSummary = (chat: ChatHistory) => {
    const userMessages = chat.messages.filter((msg) => msg.role === "user");
    if (userMessages.length > 0) {
      return userMessages[0].content.slice(0, 30) + "...";
    }
    return "Nowy czat";
  };

  const groupedChats = chatHistories.reduce(
    (acc, chat) => {
      const topic = chat.title.split(" ")[0];
      if (!acc[topic]) {
        acc[topic] = [];
      }
      acc[topic].push(chat);
      return acc;
    },
    {} as Record<string, ChatHistory[]>,
  );

  return (
    <section className="basis-1/5">
      <Link href="/">
        <h1 className="sr-only">ava</h1>
        <NextImage
          src="/images/LOGO.svg"
          alt="AVA logo"
          width={55}
          height={16}
        />
      </Link>
      <div>
        <h2 className="mb-4 mt-8 text-lg">Historia wyszukiwań</h2>
        <ul className="mb-4 flex flex-wrap gap-4 lg:flex-col">
          {Object.entries(groupedChats).map(([topic, chats]) => (
            <li key={topic}>
              <article className="flex flex-col gap-2">
                <h3>{topic}</h3>
                <ul className="text-color-text-medium">
                  {chats.map((chat) => (
                    <li
                      key={chat.id}
                      onClick={() => selectChat(chat.id)}
                      className={`cursor-pointer ${chat.id === currentChatId ? "font-bold" : ""}`}
                    >
                      {getChatSummary(chat)}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
        <button className="disabled mt-8 cursor-not-allowed border-b border-color-black pb-1 font-medium opacity-50">
          Zobacz całą historię
        </button>
      </div>
    </section>
  );
};
