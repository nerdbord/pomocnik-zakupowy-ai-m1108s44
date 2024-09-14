"use client";

import { UserButton } from "@clerk/nextjs";
import { Message, useChat } from "ai/react";
import axios from "axios";
import Image from "next/image";
import NextImage from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Try() {
  const initialMessages: Message[] = [
    {
      id: "2",
      role: "assistant",
      content: "W czym mogę Ci pomóc?",
    },
  ];
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleSubmitToChat,
  } = useChat({ initialMessages });
  const [results, setResults] = useState<string[] | null>(null);

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
      <section className="flex h-full justify-between gap-20">
        <section className="basis-1/5">
          <Link href="/">
            <NextImage
              src="/images/LOGO.svg"
              alt="AVA logo"
              width={55}
              height={16}
            />
          </Link>
          <h2 className="mb-4 mt-8 text-lg">Search history</h2>
          <ul className="mb-4 flex flex-col gap-4">
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
        </section>
        <section className="flex h-full basis-3/5 flex-col justify-between">
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
              <button className="btn-sm">No, thanks</button>
              <button className="btn btn-primary btn-sm">Upgrade</button>
            </div>
          </div>
          <div>
            <ul>
              {messages.map(({ id, role, content }) => (
                <li key={id} className="chat chat-start">
                  <div className="avatar chat-image">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <div className="bg-color-gray chat-bubble">{content}</div>
                </li>
              ))}
              {results &&
                results.length > 0 &&
                results.map(({ image, title, price, link }) => (
                  <li key={title} className="chat chat-start">
                    <img src={image} width={200} height={200} alt={title} />
                    <div>{title}</div>
                    <div>{price}</div>
                    <div>{link}</div>
                  </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="mt-8 flex">
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
        <section className="flex basis-1/5 items-start gap-6">
          <button className="btn btn-info flex items-center font-normal">
            Start new chat <span className="text-lg font-bold">+</span>
          </button>
          <UserButton />
        </section>
      </section>
    </div>
  );
}
