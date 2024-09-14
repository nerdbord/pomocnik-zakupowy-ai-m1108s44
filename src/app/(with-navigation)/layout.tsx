import NextImage from "next/image";
import { NAV_ITEMS } from "@/constants";
import Link from "next/link";
import { Header } from "@/app/components/Header";

export default function LayoutWithNavigation({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Header />
      {children}

      <footer className="bg-background-secondary py-24">
        <div className="container mx-auto max-w-7xl">
          <section className="flex justify-between pb-12">
            <section className="flex flex-col gap-8">
              <NextImage
                src="/images/LOGO.svg"
                alt="AVA logo"
                width={55}
                height={16}
              />
              <address>
                <p className="font-bold">Contact:</p>
                <Link href="mailto:support@ai-shopping-assistant.com">
                  support@ai-shopping-assistant.com
                </Link>
              </address>
            </section>
            <nav>
              <ul className="flex gap-4 font-bold">
                {NAV_ITEMS.map(({ id, label, href }) => (
                  <li key={id}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          <div className="divider divider-accent" />
          <section className="flex justify-between">
            <p>© 2024 ava. All rights reserved.</p>
            <ul className="flex gap-4">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies-settings">Cookies Settings</Link>
              </li>
            </ul>
          </section>
        </div>
      </footer>
    </div>
  );
}
