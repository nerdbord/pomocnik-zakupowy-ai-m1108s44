"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Message, useChat } from "ai/react";
import axios from "axios";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
}

export default function TryForFree() {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const { user } = useUser();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(true);
  const [results, setResults] = useState<any[]>([]);

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      initialMessages: [],
    });

  useEffect(() => {
    loadChatHistories();
    if (!currentChatId) {
      startNewChat();
    }
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (currentChatId) {
      saveChatHistory();
    }
  }, [messages]);

  const loadChatHistories = () => {
    const histories = JSON.parse(localStorage.getItem("chatHistories") || "[]");
    setChatHistories(histories);
  };

  const saveChatHistory = () => {
    const updatedHistories = chatHistories.map((history) =>
      history.id === currentChatId ? { ...history, messages } : history,
    );
    localStorage.setItem("chatHistories", JSON.stringify(updatedHistories));
    setChatHistories(updatedHistories);
  };

  const startNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatHistory = {
      id: newChatId,
      title: `Chat ${chatHistories.length + 1}`,
      messages: [
        {
          id: "initial",
          role: "assistant",
          content: "Hi! What are you looking for today?",
        },
      ],
    };
    setChatHistories((prevHistories) => [...prevHistories, newChat]);
    setCurrentChatId(newChatId);
    setMessages(newChat.messages);
    localStorage.setItem(
      "chatHistories",
      JSON.stringify([...chatHistories, newChat]),
    );
  };

  const selectChat = (chatId: string) => {
    const selectedChat = chatHistories.find((history) => history.id === chatId);
    if (selectedChat) {
      setCurrentChatId(chatId);
      setMessages(selectedChat.messages);
    }
  };

  useEffect(() => {
    const getResults = async () => {
      if (messages.length === 0) return;
      const lastMessage = messages[messages.length - 1].content;

      if (
        lastMessage.includes("Teraz szukam dla ciebie najlepszych propozycji!")
      ) {
        const userQuery = lastMessage
          .replace("Teraz szukam dla ciebie najlepszych propozycji!", "")
          .trim();

        try {
          const tavilyResponse = await axios.post("/api/tavily", { userQuery });
          setResults(tavilyResponse.data.answer);
        } catch (error) {
          console.error("Error fetching results:", error);
        }
      }
    };

    getResults();
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="h-dvh min-h-dvh px-16 pb-20 pt-8">
      <section className="flex h-full flex-col justify-between gap-20 lg:flex-row">
        <SearchHistorySection
          chatHistories={chatHistories}
          selectChat={selectChat}
          currentChatId={currentChatId}
        />
        <ChatSection
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleSubmit}
          results={results}
          isPopupVisible={isPopupVisible}
          setIsPopupVisible={setIsPopupVisible}
          chatEndRef={chatEndRef}
        />
        <UserSection startNewChat={startNewChat} />
      </section>
    </div>
  );
}

function SearchHistorySection({
  chatHistories,
  selectChat,
  currentChatId,
}: {
  chatHistories: ChatHistory[];
  selectChat: (chatId: string) => void;
  currentChatId: string | null;
}) {
  const getChatSummary = (chat: ChatHistory) => {
    const userMessages = chat.messages.filter((msg) => msg.role === "user");
    if (userMessages.length > 0) {
      return userMessages[0].content.slice(0, 30) + "...";
    }
    return "Empty chat";
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
        <h2 className="mb-4 mt-8 text-lg">Search history</h2>
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
        <Link
          href="/account/search-history"
          className="border-color-black mt-8 border-b pb-1 font-medium"
        >
          See full search history
        </Link>
      </div>
    </section>
  );
}

function ChatSection({
  messages,
  input,
  handleInputChange,
  handleFormSubmit,
  results,
  isPopupVisible,
  setIsPopupVisible,
  chatEndRef,
}: {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  results: any[];
  isPopupVisible: boolean;
  setIsPopupVisible: (value: boolean) => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
}) {
  const { user } = useUser();

  return (
    <section className="flex h-full basis-3/5 flex-col justify-between">
      {isPopupVisible && (
        <div role="alert" className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-color-black h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="text-md">Unlock personalized shopping</h3>
            <p className="text-color-dark-light text-sm">
              Upgrade now to get tailored recommendations just for you.
            </p>
          </div>
          <div>
            <button className="btn-sm" onClick={() => setIsPopupVisible(false)}>
              No, thanks
            </button>
            <button className="btn btn-primary btn-sm">Upgrade</button>
          </div>
        </div>
      )}
      <div />
      <div>
        <ul>
          {messages.map(({ id, role, content }) => (
            <li
              key={id}
              className={`chat ${role === "assistant" ? "chat-start" : "chat-end"}`}
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
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </SignedOut>
                </div>
              </div>
              <div
                className={`${role === "assistant" ? "bg-color-gray" : "bg-color-primary-light"} chat-bubble`}
              >
                {content}
              </div>
            </li>
          ))}
        </ul>

        <div ref={chatEndRef} />

        {results && results.length > 0 && (
          <ul className="mt-8 flex flex-col justify-center gap-4 lg:flex-row">
            {results.map(({ image, title, price, link }) => (
              <li
                key={title}
                className="card card-compact bg-base-100 shadow-xl"
              >
                <figure className="h-[120px] w-[250px]">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-contain"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-sm">{title}</h2>
                  <p className="text-xs">
                    {new Intl.NumberFormat("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                    }).format(Number(price))}
                  </p>
                  <div className="card-actions justify-start">
                    <Link href={link} className="btn btn-primary btn-xs">
                      Check offer
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleFormSubmit} className="mt-8 flex gap-2">
          <input
            type="text"
            placeholder="Type here..."
            className="bg-color-gray input mb-4 w-full"
            value={input}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

function UserSection({ startNewChat }: { startNewChat: () => void }) {
  return (
    <section className="absolute right-6 top-6 flex basis-1/5 items-start gap-6 lg:static">
      <button
        className="btn btn-info flex items-center font-normal"
        onClick={startNewChat}
      >
        Start new chat <span className="text-lg font-bold">+</span>
      </button>
      <UserButton />
    </section>
  );
}
