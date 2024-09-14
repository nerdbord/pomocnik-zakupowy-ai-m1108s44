import { NAV_ITEMS } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import NextImage from "next/image";

export const Header = () => {
  return (
    <header className="container mx-auto flex max-w-7xl items-center justify-between py-4">
      <div>
        <h1 className="sr-only">ava</h1>
        <Link href="/">
          <NextImage
            src="/images/LOGO.svg"
            alt="AVA logo"
            width={55}
            height={16}
          />
        </Link>
      </div>
      <nav className="flex items-center gap-[58px]">
        <ul className="flex gap-4">
          {NAV_ITEMS.map(({ id, label, href }) => (
            <li key={id}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-4">
          <li className="flex items-center">
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <Link href="/sign-in" className="btn">
                Log in
              </Link>
            </SignedOut>
          </li>
          <li>
            <Link href="/try" className="btn btn-primary text-white">
              Try AI assistant
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
