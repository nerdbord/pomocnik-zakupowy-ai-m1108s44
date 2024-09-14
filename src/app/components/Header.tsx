import { NAV_ITEMS } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>LOGO</h1>
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
              <Link href="/sign-up" className="btn">
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
