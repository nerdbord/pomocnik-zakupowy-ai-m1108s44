"use client";

import React, { useEffect, useState } from "react";
import { ChatHistory } from "@/app/components/chat/types";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { BackIcon } from "../Icons";

interface SingleChatProps {
  chatId: string;
}

const SingleChat: React.FC<SingleChatProps> = ({ chatId }) => {
  const [chat, setChat] = useState<ChatHistory | null>(null);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const savedHistories = localStorage.getItem("chatHistories");
    if (savedHistories) {
      const chatHistories: ChatHistory[] = JSON.parse(savedHistories);
      const selectedChat = chatHistories.find((c) => c.id === chatId);
      if (selectedChat) {
        setChat(selectedChat);
      }
    }
  }, [chatId]);

  const handleBack = () => {
    router.back();
  };

  if (!chat) {
    return <div>Ładowanie czatu...</div>;
  }

  return (
    <div className=" px-4 pb-20 pt-6 xl:px-16">
      <section className="mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-between gap-10 xl:gap-20">

        <button
          onClick={handleBack}
          className="lg:fixed lg:block hidden left-1 top-13 lg:left-40  lg:top-40 rounded-lg  text-white"
        >
          <BackIcon />
        </button>

        <h2 className="mb-4 text-2xl">{chat.title}</h2>

        <ul className="flex flex-col gap-4">
          {chat.messages.map(({ role, content }, index) => (
            <li
              key={index}
              className={`chat ${
                role === "assistant" ? "chat-start" : "chat-end"
              }`}
            >
              <div className="avatar chat-image">
                <div className="w-10 rounded-full">
                  <SignedIn>
                    <img
                      src={
                        role === "user"
                          ? user?.imageUrl
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt="User avatar"
                    />
                  </SignedIn>
                  <SignedOut>
                    <img
                      alt="AI avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </SignedOut>
                </div>
              </div>
              <div
                className={`${
                  role === "assistant"
                    ? "bg-color-gray"
                    : "bg-color-primary-light"
                } chat-bubble`}
              >
                {content}
              </div>
            </li>
          ))}
        </ul>

        {chat.results && chat.results.length > 0 && (
          <ul className="mx-0 mt-8 flex flex-wrap items-stretch justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
            {chat.results.map((order, index) => (
              <li
                key={index}
                className="card card-compact mb-8 max-w-[250px] bg-base-100 shadow-xl"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
              >
                <figure className="h-[120px] w-[200px]">
                  <img
                    src={order.image}
                    alt={order.title}
                    className="h-full max-w-full object-contain p-2"
                  />
                </figure>
                <div className="card-body flex flex-col justify-between">
                  <h2 className="card-title text-sm">{order.title}</h2>
                  <div className="mt-auto">
                    <p className="mb-2 text-right text-xs">{order.price}</p>
                    <div className="card-actions justify-start">
                      <a
                        target="_blank"
                        href={order.link}
                        className="btn btn-primary btn-xs h-[40px] w-full"
                      >
                        Sprawdź ofertę
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default SingleChat;
