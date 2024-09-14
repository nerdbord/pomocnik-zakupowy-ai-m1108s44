import { Hero } from "@/components/Hero";
import { Features } from "@/components/sections/Features";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <Features />
    </div>
  );
}
