import Link from "next/link";
import NextImage from "next/image";

export const LogoButton = () => {
  return (
    <figure>
      <h1 className="sr-only">ava</h1>
      <Link href="/">
        <NextImage
          src="/images/LOGO.svg"
          alt="AVA logo"
          width={55}
          height={16}
        />
      </Link>
    </figure>
  );
};
