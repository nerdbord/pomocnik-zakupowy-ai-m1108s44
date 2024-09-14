import { FAQ_ITEMS } from "@/constants";

export const FAQs = () => {
  return (
    <section className="flex w-full justify-between py-24">
      <h3>FAQs</h3>
      <div className="basis-2/3">
        <ul>
          {FAQ_ITEMS.map(({ id, question, answer }) => (
            <li key={id} className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <h4 className="collapse-title text-lg font-bold">{question}</h4>
              <p className="collapse-content">{answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
