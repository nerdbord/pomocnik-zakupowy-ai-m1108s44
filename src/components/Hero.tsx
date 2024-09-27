import NextImage from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <header className="bg-background-primary flex w-full items-center md:h-[500px]">
      <div className="mx-auto w-full max-w-7xl justify-between px-16 md:flex">
        <div className="basis-2/3 py-8">
          <h2 className="text-[32px] font-bold leading-tight md:text-[46px]">
            Znajdź dokładnie to, czego potrzebujesz. Szybko i bez wysiłku.
          </h2>
          <p className="w-2/3 py-6 text-[18px]">
            Ava to asystent zakupowy oparty na AI, który upraszcza wyszukiwanie
            produktów, pomagając szybko znaleźć te, które odpowiadają Twoim
            potrzebom.
          </p>
          <Link href="/try-for-free" className="btn btn-primary text-white">
            Idź na zakupy z AVA
          </Link>
        </div>
        <div className="flex basis-1/3 items-center">
          <NextImage
            src="/images/trolley.svg"
            width={600}
            height={600}
            alt="Trolley"
          />
        </div>
      </div>
    </header>
  );
};
