/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import axios from "axios";

interface Product {
  title: string;
  price: string;
  image: string;
  link: string;
}

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<Product[]>([]);
  const [chatHistory, setChatHistory] = useState<string>(
    "AI: Hej, czego dzisiaj potrzebujesz?\n",
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConversationComplete, setIsConversationComplete] =
    useState<boolean>(false);
  const [questionsAsked, setQuestionsAsked] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await axios.post("/api/openai-chat", {
        userMessage: message,
        chatHistory,
        questionsAsked,
      });

      const assistantResponse = result.data.answer;

      if (
        assistantResponse.includes(
          "Teraz szukam dla ciebie najlepszych propozycji!",
        )
      ) {
        console.log("tak");

        const userQuery = assistantResponse
          .replace("Teraz szukam dla ciebie najlepszych propozycji!", "")
          .trim();

        const tavilyResponse = await axios.post("/api/tavily", { userQuery });

        const formattedResults = tavilyResponse.data.answer; // Odpowiedź w formacie JSON z Tavily
        setResponse(JSON.parse(formattedResults));
        setIsConversationComplete(true);
      } else {
        setChatHistory(
          (prev) => prev + `User: ${message}\nAI: ${assistantResponse}\n`,
        );
        setQuestionsAsked(questionsAsked + 1);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse([]);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mx-auto w-full max-w-screen-lg rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Shopping Assistant
        </h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Type your request..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isConversationComplete}
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
            disabled={
              isLoading || (isConversationComplete && response.length === 0)
            }
          >
            {isLoading
              ? "Loading..."
              : isConversationComplete
                ? "Fetching Results"
                : "Send"}
          </button>
        </form>

        <div className="chat-history mb-4 max-h-96 space-y-4 overflow-y-auto">
          {chatHistory &&
            chatHistory.split("\n").map((line, index) => (
              <div
                key={index}
                className={`max-w-xl rounded-lg p-4 ${line.startsWith("AI:") ? "self-start bg-blue-100 text-left" : "self-end bg-gray-100 text-right"}`}
              >
                {line}
              </div>
            ))}
        </div>

        {isLoading && isConversationComplete && (
          <div className="rounded-md bg-gray-100 p-4">
            <p className="text-center text-gray-700">
              Fetching response, please wait...
            </p>
          </div>
        )}

        {!isLoading && response.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {response.map((item, index) => (
              <div key={index} className="card w-full bg-base-100 shadow-xl">
                <img
                  src={item.image}
                  alt=""
                  className="h-48 w-full object-cover"
                />
                <div className="card-body">
                  <h2 className="card-title">
                    {item.title || "Unknown Product"}
                  </h2>
                  <p>
                    <strong>Price:</strong> {item.price || "Not available"}
                  </p>
                  <div className="card-actions justify-end">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-primary">Buy Now</button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
