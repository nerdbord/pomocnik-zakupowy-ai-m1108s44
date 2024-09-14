import { Hero } from "@/app/components/Hero";
import { FAQs } from "@/app/components/sections/FAQs";
import { Features } from "@/app/components/sections/Features";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <FAQs />
    </div>
  );
}
