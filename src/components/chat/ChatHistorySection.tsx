import { ChatHistory } from "@/components/chat/types";
import { useChatStore } from "@/store/chatStore";
import NextImage from "next/image";
import Link from "next/link";

export const ChatHistorySection = () => {
  const { chatHistories, currentChatId, setCurrentChatId, setChatHistories } =
    useChatStore();

  const deleteChat = (chatId: string) => {
    const updatedHistories = chatHistories.filter((chat) => chat.id !== chatId);
    setChatHistories(updatedHistories);
  };

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
    <aside className="hidden w-1/5 md:block">
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
                        key={chat.id}
                        className={`mx-1 my-2 flex cursor-pointer justify-between rounded-lg ${
                          chat.id === currentChatId
                            ? "bg-black/30 font-bold text-black"
                            : ""
                        } `}
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                        }}
                      >
                        <p
                          className="w-full p-2"
                          onClick={() => setCurrentChatId(chat.id)}
                        >
                          {getChatSummary(chat)}
                        </p>
                        <button
                          onClick={() => deleteChat(chat.id)}
                          className="ml-2 px-2 text-red-500 hover:text-red-700"
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
          <button className="disabled mt-8 cursor-not-allowed border-b border-color-black pb-1 font-medium opacity-50">
            Zobacz całą historię
          </button>
        </div>
      </div>
    </aside>
  );
};
