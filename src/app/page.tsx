import { Hero } from "@/components/Hero";
import { FAQs } from "@/components/sections/FAQs";
import { Features } from "@/components/sections/Features";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <FAQs />
    </div>
  );
}
