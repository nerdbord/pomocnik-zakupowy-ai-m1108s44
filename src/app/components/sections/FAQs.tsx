import { FAQ_ITEMS } from "@/constants";

export const FAQs = () => {
  return (
    <section className="bg-background-primary py-24">
      <div className="container mx-auto flex w-full max-w-7xl justify-between">
        <h3 className="title">FAQs</h3>
        <div className="basis-2/3">
          <ul>
            {FAQ_ITEMS.map(({ id, question, answer }) => (
              <li
                key={id}
                className="border-color-black collapse collapse-arrow rounded-none border-b-2 px-0"
              >
                <input
                  type="radio"
                  name="my-accordion-2  px-0"
                  defaultChecked
                />
                <h4 className="collapse-title px-0 text-lg font-bold">
                  {question}
                </h4>
                <p className="collapse-content px-0">{answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
