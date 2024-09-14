import { NAV_ITEMS } from "@/constants";
import NextImage from "next/image";
import Link from "next/link";

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
          <li>
            <Link href="/log-in" className="btn">
              Log in
            </Link>
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
