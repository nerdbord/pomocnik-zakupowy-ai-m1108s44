import { FAQ_ITEM, FEATURE_ITEM, NAV_ITEM } from "@/types";

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

export const FEATURE_ITEMS: FEATURE_ITEM[] = [
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

export const FAQ_ITEMS: FAQ_ITEM[] = [
  {
    id: 0,
    question: "What is the benefit of creating an account?",
    answer:
      "Creating an account is quick and simple. It allows you to save your preferences and access personalized features. Sign up today to enhance your shopping experience!",
  },
  {
    id: 2,
    question: "Is there a cost to use the AI shopping assistant?",
    answer:
      "Using the basic version of AI shopping assistant is completely free. The premium version costs $5 dollars per month.",
  },
  {
    id: 3,
    question: "Is my data safe?",
    answer:
      "Your privacy is our priority. We implement robust security measures to protect your data. Shop with confidence knowing your information is secure.",
  },
  {
    id: 4,
    question: "What should I do if I encounter an issue or error?",
    answer:
      "If you encounter an issue or error,  contact our support team through the help section for assistance.",
  },
];
