import { FEATURE, NAV_ITEM } from "@/types";

export const NAV_ITEMS: NAV_ITEM[] = [
  {
    id: "product",
    label: "Product",
    href: "/product",
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing",
  },
  {
    id: "company",
    label: "Company",
    href: "/company",
  },
];

export const FEATURES: FEATURE[] = [
  {
    id: 0,
    title: "Effortless product discovery",
    description: `Our AI shopping assistant streamlines your search for products by understanding your unique preferences. Just tell it what you're looking for, and it will quickly present tailored options that match your criteria.`,
  },
  {
    id: 2,
    title: "Smart search technology",
    description: `Our assistant analyzes vast product databases to find exactly what you need. This ensures you spend less time searching and more time enjoying your purchases.`,
  },
  {
    id: 3,
    title: "Get personalized recommendations ",
    description: `Receive personalized product suggestions based on your shopping habits and preferences. Our AI learns from your interactions, making each search more efficient and tailored to you.`,
  },
];
