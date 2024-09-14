import { FEATURES } from "@/constants";

export const Features = () => {
  return (
    <section className="flex w-full justify-between py-24">
      <div className="basis-1/3">
        <h3 className="pb-8">How it works</h3>
        <ul className="flex flex-col gap-4">
          {FEATURES.map(({ id, title, description }) => (
            <li
              key={id}
              className="border-primary pl-8 first-of-type:border-l-2"
            >
              <h4 className="text-3xl font-bold">{title}</h4>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </div>
      <figure className="aspect-square basis-1/2 border border-black"></figure>
    </section>
  );
};
