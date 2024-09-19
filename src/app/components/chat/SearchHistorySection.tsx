import { ChatHistory } from "@/app/components/chat/types";
import NextImage from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { OpenWebIcon } from "../Icons";


export const SearchHistorySection = ({
  selectChat,
  currentChatId,
}: {
  chatHistories: ChatHistory[];
  selectChat: (chatId: string) => void;
  currentChatId: string | null;
}) => {
  const [localChatHistories, setLocalChatHistories] = useState<ChatHistory[]>(
    [],
  );

  useEffect(() => {
    const savedHistories = localStorage.getItem("chatHistories");
    if (savedHistories) {
      setLocalChatHistories(JSON.parse(savedHistories));
    }
  }, []);

  const deleteChat = (chatId: string) => {
    const updatedHistories = localChatHistories.filter(
      (chat) => chat.id !== chatId,
    );
    setLocalChatHistories(updatedHistories);
    localStorage.setItem("chatHistories", JSON.stringify(updatedHistories));
  };

  const getChatSummary = (chat: ChatHistory) => {
    const userMessages = chat.messages.filter((msg) => msg.role === "user");
    if (userMessages.length > 0) {
      return userMessages[0].content.slice(0, 30) + "...";
    }
    return "Nowy czat";
  };

  const groupedChats = localChatHistories.reduce(
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
      <div className="sticky top-6">
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
          <ul className="mb-4 flex max-h-[50vh] flex-wrap gap-4 overflow-scroll lg:flex-col">
            {Object.entries(groupedChats).map(([topic, chats]) => (
              <li key={topic}>
                <article className="flex flex-col gap-2">
                  <h3>{topic}</h3>
                  <ul className="text-color-text-medium">
                    {chats.map((chat) => (
                      <li
                        onClick={() => selectChat(chat.id)}
                        key={chat.id}
                        className={`mx-1 my-2 flex cursor-pointer justify-between rounded-lg p-2 ${
                          chat.id === currentChatId
                            ? "bg-black/30 font-bold text-black"
                            : ""
                        } `}
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                        }}
                      >
                        <span>{getChatSummary(chat)}</span>
                        <button
                          onClick={() => deleteChat(chat.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                          title="Usuń historię"
                        >
                          &#10005;
                        </button>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
          <Link
            href={"/chat-history"}
            className="mt-8  font-medium text-black flex gap-3 w-full btn"
          >
            Zobacz całą historię
            <OpenWebIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};
