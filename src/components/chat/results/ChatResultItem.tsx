import { Result } from "@/components/chat/types";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export const ChatResultItem = ({result: {image, title, price, link}}: {result: Result}) => {
    return (
      <li
        className="card card-compact mb-8 max-w-[250px] bg-base-100 shadow-xl"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <figure className="h-[120px] w-[200px]">
          <img
            src={image}
            alt={title}
            className="h-full max-w-full object-contain p-2"
          />
        </figure>
        <div className="card-body flex flex-col justify-between">
          <h2 className="card-title text-sm">{title}</h2>
          <div className="mt-auto">
            <p className="mb-2 text-right text-xs">{price}</p>
            <div className="card-actions justify-start">
              <Link
                target="_blank"
                href={link}
                className="btn btn-primary btn-xs h-[40px] w-full"
              >
                Sprawdź ofertę
              </Link>
            </div>
          </div>
        </div>
      </li>
    );
}