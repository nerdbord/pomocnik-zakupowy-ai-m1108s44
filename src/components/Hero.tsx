import NextImage from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <header className="bg-background-primary flex w-full items-center sm:h-[500px]">
      <div className="mx-auto w-full max-w-7xl justify-between px-16 sm:flex">
        <div className="basis-2/3 py-8">
          <h2 className="flex flex-col text-[32px] font-bold leading-tight sm:text-[56px]">
            Find exactly what you need, fast and without a hassle!
          </h2>
          <p className="w-2/3 py-6">
            Our AI shopping assistant simplifies your search for products,
            helping you find product that match your needs in no time.
          </p>
          <Link href="/try" className="btn btn-primary text-white">
            Go shopping with ava
          </Link>
        </div>
        <div className="basis-1/3">
          <NextImage
            src="/images/trolley.svg"
            width={450}
            height={450}
            alt="Trolley"
          />
        </div>
      </div>
    </header>
  );
};
