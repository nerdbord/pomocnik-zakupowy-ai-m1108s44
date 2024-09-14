import Link from "next/link";

export default function Try() {
  return (
    <div className="min-h-dvh">
      <Link href="/">Return to homepage</Link>
      <section>
        <article>
          <ul>
            <li className="chat chat-start">
              <div className="avatar chat-image">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-bubble chat-bubble-info">
                It was said that you would, destroy the Sith, not join them.
              </div>
            </li>
          </ul>
        </article>
        <form>
          <input type="text" />
          <button type="submit"></button>
        </form>
      </section>
    </div>
  );
}
