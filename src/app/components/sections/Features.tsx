import { FEATURE_ITEMS } from "@/constants";
import NextImage from "next/image";

export const Features = () => {
  return (
    <section className="bg-background-secondary py-24">
      <div className="container mx-auto w-full max-w-7xl justify-between gap-24 lg:flex">
        <div className="basis-1/2">
          <h3 className="title pb-8">How it works</h3>
          <ul className="flex flex-col h-full justify-around">
            {FEATURE_ITEMS.map(({ id, title, description }) => (
              <li
                key={id}

              >
                <h4 className="text-3xl font-bold">{title}</h4>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>
        <figure className="flex aspect-square basis-1/2 items-center justify-center">
          <NextImage
            src="/images/macbook-pro-16-inch.png"
            width={600}
            height={365}
            alt="Macbook-pro-16"
          />
        </figure>
      </div>
    </section>
  );
};
