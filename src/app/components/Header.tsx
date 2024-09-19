"use client";

import { NAV_ITEMS } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import NextImage from "next/image";
import { useState } from "react";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="sticky top-0 bg-white py-4 shadow-md z-10">
      <div className="container mx-auto flex max-w-7xl items-center justify-between">
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
        <nav className="hidden items-center gap-[58px] md:flex">
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
                  Zaloguj się
                </Link>
              </SignedOut>
            </li>
            <li>
              <Link href="/try-for-free" className="btn btn-primary text-white">
                Wypróbuj asystenta AI
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="hamburger focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="absolute left-0 right-0 top-16 bg-white p-4 shadow-lg md:hidden">
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map(({ id, label, href }) => (
                <li key={id}>
                  <Link href={href} onClick={toggleMobileMenu}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-col gap-4">
              <li className="flex items-center justify-center">
                <SignedIn>
                  <UserButton />
                </SignedIn>

                <SignedOut>
                  <Link href="/sign-in" className="btn w-full text-center">
                    Zaloguj się
                  </Link>
                </SignedOut>
              </li>
              <li>
                <Link
                  href="/try-for-free"
                  className="btn btn-primary w-full text-center text-white"
                  onClick={toggleMobileMenu}
                >
                  Wypróbuj czat
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
