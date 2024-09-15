/* eslint-disable @next/next/no-img-element */
import { Result } from "@/app/components/chat/types";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Message } from "ai";
import Link from "next/link";

export const ChatSection = ({
  messages,
  input,
  handleInputChange,
  handleFormSubmit,
  results,
  isPopupVisible,
  setIsPopupVisible,
  chatEndRef,
  loader,
}: {
  messages: Message[];
  input: string;
  loader: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  results: Result[];
  isPopupVisible: boolean;
  setIsPopupVisible: (value: boolean) => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
}) => {
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
          <ul className="mx-0 mt-8 flex flex-col items-center justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
            {results.map(({ image, title, price, link }) => (
              <li
                key={title}
                className="card card-compact mb-2 max-w-[250px] bg-base-100 shadow-xl"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
              >
                <figure className="h-[120px] w-[250px]">
                  <img
                    src={image}
                    alt={title}
                    className="h-full max-w-full object-contain p-2"
                  />
                </figure>
                <div className="card-body flex flex-col justify-between">
                  <h2 className="card-title text-sm">{title}</h2>
                  <div className="mt-auto">
                    <p className="mb-2 text-right text-xs">{price}</p>
                    <div className="card-actions justify-start">
                      <Link
                        target="_blank"
                        href={link}
                        className="btn btn-primary btn-xs h-[40px] w-full"
                      >
                        Sprawdź ofertę
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {loader && (
          <ul className="mx-0 mt-8 flex flex-col items-center justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
            <li
              className="card skeleton card-compact mb-2 max-w-[250px] bg-[#000] shadow-xl"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >
              <figure className="h-[120px] w-[250px]"></figure>
              <div className="card-body flex flex-col justify-between">
                <h2 className="card-title text-sm"></h2>
                <div className="mt-auto">
                  <p className="mb-2 text-right text-xs"></p>
                  <div className="card-actions skeleton justify-start bg-[#000]">
                    <button className="btn-skeleton btn-xs h-[40px] w-full"></button>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="card skeleton card-compact mb-2 max-w-[250px] bg-[#000] shadow-xl"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >
              <figure className="h-[120px] w-[250px]"></figure>
              <div className="card-body flex flex-col justify-between">
                <h2 className="card-title text-sm"></h2>
                <div className="mt-auto">
                  <p className="mb-2 text-right text-xs"></p>
                  <div className="card-actions skeleton justify-start bg-[#000]">
                    <button className="btn-skeleton btn-xs h-[40px] w-full"></button>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="card skeleton card-compact mb-2 max-w-[250px] bg-[#000] shadow-xl"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >
              <figure className="h-[120px] w-[250px]"></figure>
              <div className="card-body flex flex-col justify-between">
                <h2 className="card-title text-sm"></h2>
                <div className="mt-auto">
                  <p className="mb-2 text-right text-xs"></p>
                  <div className="card-actions skeleton justify-start bg-[#000]">
                    <button className="btn-skeleton btn-xs h-[40px] w-full"></button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        )}
        {!loader && (
          <>
            {results.length === 0 && (
              <form onSubmit={handleFormSubmit} className="mt-8 flex gap-2">
                <input
                  type="text"
                  placeholder="Np. nowego telefonu z dobrą pamiecią"
                  className="bg-color-gray input mb-4 w-full"
                  value={input}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!input.length}
                  aria-disabled={!input.length}
                >
                  Wyślij
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </section>
  );
};
