import { FaqItem, FeatureItem, NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    id: "product",
    label: "Produkt",
    href: "/",
  },
  {
    id: "pricing",
    label: "Cennik",
    href: "/",
  },
  {
    id: "company",
    label: "Firma",
    href: "/",
  },
];

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: 0,
    title: "Powiedz, czego szukasz",
    description: `Ava usprawnia wyszukiwanie produktów według Twoich kryteriów. Wystarczy, że sprecyzujesz, czego dokładnie szukasz.`,
  },
  {
    id: 2,
    title: "Znajdź idealne produkty",
    description: `Nasz asystent zakupowy analizuje bazy danych produktów wielu sklepów, aby znaleźć dokładnie to, czego potrzebujesz. Oszczędzasz czas i odkrywasz najlepsze oferty bez wysiłku.`,
  },
  {
    id: 3,
    title: "Otrzymaj spersonalizowane rekomendacje produktów",
    description: `Ava dopasowuje propozycje produktów w oparciu o Twoje preferencje i zwyczaje zakupowe. Nasz system analizuje Twoje zapytania, co pozwala na coraz lepsze i bardziej precyzyjne wyniki przy każdym kolejnym wyszukiwaniu.`,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 0,
    question: "Dlaczego warto założyć konto?",
    answer:
      "Założenie konta pozwala na zapisanie Twoich preferencji i dostęp do spersonalizowanych funkcji. Zarejestruj się już dziś, aby poprawić swoje doświadczenia zakupowe!",
  },
  {
    id: 2,
    question: "Ile kosztuje korzystanie z ava?",
    answer:
      "Korzystanie z podstawowej wersji jest całkowicie bezpłatne. Wersja premium kosztuje 5 złotych miesięcznie.",
  },
  {
    id: 3,
    question: "Czy moje dane są bezpieczne?",
    answer:
      "Twoja prywatność jest dla nas priorytetem. Stosujemy solidne środki bezpieczeństwa, aby chronić Twoje dane. ",
  },
  {
    id: 4,
    question: "Co zrobić, jeśli napotkam problem lub błąd?",
    answer:
      "W przypadku napotkania problemu lub błędu skontaktuj się z działem supportu poprzez email: support@ava.pl",
  },
];
