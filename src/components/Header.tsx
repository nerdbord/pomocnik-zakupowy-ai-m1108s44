"use client";

import { NAV_ITEMS } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { LogoButton } from "@/components/LogoButton";
import { HamburgerButton } from "@/components/HamburgerButton";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="sticky top-0 bg-white py-4 shadow-md">
      <div className="container mx-auto flex max-w-7xl items-center justify-between">
        <LogoButton />
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
          <HamburgerButton onClick={toggleMobileMenu} />
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
