"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Message, useChat } from "ai/react";
import axios from "axios";
import NextImage from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Try() {
  const initialMessages: Message[] = [
    {
      id: "2",
      role: "assistant",
      content: "Hi! What are you looking for today?",
    },
  ];
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleSubmitToChat,
  } = useChat({ initialMessages });
  const mockedResults = [
    {
      title: "Adiki",
      price: "200",
      image: "/images/trolley.png",
      link: "example",
    },
    {
      title: "Naje",
      price: "200",
      image: "/images/trolley.png",
      link: "example",
    },
    {
      title: "Rybok",
      price: "200",
      image: "/images/trolley.png",
      link: "example",
    },
  ];
  const { user } = useUser();
  const [results, setResults] = useState();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(true);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const lastMessage = messages[messages.length - 1].content;

    console.log(lastMessage);

    if (
      lastMessage.includes("Teraz szukam dla ciebie najlepszych propozycji!")
    ) {
      console.log("tak");

      const userQuery = lastMessage
        .replace("Teraz szukam dla ciebie najlepszych propozycji!", "")
        .trim();

      const tavilyResponse = await axios.post("/api/tavily", { userQuery });

      const formattedResults = await tavilyResponse.data; // Odpowiedź w formacie JSON z Tavily
      setResults(await formattedResults.answer);
      console.log(results);
    }

    handleSubmitToChat(e);
  };

  return (
    <div className="h-dvh min-h-dvh px-16 pb-20 pt-8">
      <section className="flex h-full flex-col justify-between gap-20 lg:flex-row">
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
              <li>
                <article className="flex flex-col gap-2">
                  <h3>Fashion</h3>
                  <ul className="text-color-text-medium">
                    <li>High-heeled winter boots...</li>
                    <li>Golden watch for women...</li>
                  </ul>
                </article>
              </li>
              <li>
                <article className="flex flex-col gap-2">
                  <h3>Electronics</h3>
                  <ul className="text-color-text-medium">
                    <li>NVIDIA GeForce RTX 4080</li>
                    <li>AMD Radeon RX 7800 XT</li>
                  </ul>
                </article>
              </li>
            </ul>
            <Link
              href="/account/search-history"
              className="border-color-black mt-8 border-b pb-1 font-medium"
            >
              See full search history
            </Link>
          </div>
        </section>

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
                <button
                  className="btn-sm"
                  onClick={() => setIsPopupVisible(false)}
                >
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
            <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
              <input
                type="text"
                placeholder="Type here..."
                className="bg-color-gray input w-full"
                value={input}
                onChange={handleInputChange}
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </div>
        </section>
        <section className="absolute right-6 top-6 flex basis-1/5 items-start gap-6 lg:static">
          <button
            className="btn btn-info flex items-center font-normal"
            onClick={() => location.reload()}
          >
            Start new chat <span className="text-lg font-bold">+</span>
          </button>
          <UserButton />
        </section>
      </section>
    </div>
  );
}
