import { UserButton } from "@clerk/nextjs";
import NextImage from "next/image";
import Link from "next/link";

export default function Try() {
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
              <li className="chat chat-start">
                <div className="avatar chat-image">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="bg-color-gray chat-bubble">
                  It was said that you would, destroy the Sith, not join them.
                </div>
              </li>
            </ul>
            <form className="mt-8 flex">
              <input
                type="text"
                placeholder="Type here..."
                className="bg-color-gray input w-full"
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
