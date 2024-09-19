"use client";

import React, { useEffect, useState } from "react";
import { ChatHistory } from "@/app/components/chat/types";
import { useRouter } from "next/navigation";

export default function History() {
  const [localChatHistories, setLocalChatHistories] = useState<ChatHistory[]>(
    [],
  );
  const router = useRouter();

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

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`); 
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
    <div className="container mx-auto p-6">
      <h2 className="mb-4 py-12 text-center text-2xl">Historia wyszukiwań</h2>
      <ul className="flex-row gap-4">
        {Object.entries(groupedChats).map(([topic, chats]) => (
          <li key={topic}>
            <article className="flex gap-2">
              <ul className="flex flex-wrap items-center justify-center text-color-text-medium">
                {chats.map((chat) => (
                  <li
                    key={chat.id}
                    onClick={() => handleChatClick(chat.id)}
                    className="mx-1 my-2 flex w-[300px] cursor-pointer justify-between rounded-lg p-2"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                    }}
                  >
                    <span>{getChatSummary(chat)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
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
    </div>
  );
}
