import { FAQ_ITEM, FEATURE_ITEM, NAV_ITEM } from "@/types";

export const NAV_ITEMS: NAV_ITEM[] = [
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

export const FEATURE_ITEMS: FEATURE_ITEM[] = [
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

export const FAQ_ITEMS: FAQ_ITEM[] = [
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

export const HISTORY = [
  [
    {
      id: "1726403546936",
      data: "2020-10-23",
      title: "Chat 1",
      results: [],
      messages: [
        {
          id: "initial",
          role: "assistant",
          content: "Hej, czego dzisiaj poszukujesz?",
        },
      ],
    },
    {
      id: "1726403823296",
      data: "2023-10-26",
      title: "Chat 2",
      results: [
        {
          title: "MacBook Air",
          price: "5000 PLN",
          image:
            "https://prod-api.mediaexpert.pl/api/images/gallery/thumbnails/images/26/2686653/APPLE-Macbook-Pro-13.3-Gwiezdna-szarosc-Front.jpg",
          link: "https://support.apple.com/mac/macbook-air",
        },
      ],
      messages: [
        {
          id: "initial",
          data: "2021-05-23",
          role: "assistant",
          content: "Hej, czego dzisiaj poszukujesz?",
        },
        {
          id: "HU0DPOE",
          createdAt: "2024-09-15T12:37:12.526Z",
          role: "user",
          content: "laptop do 5000 macboook szary",
        },
        {
          id: "1fTdHrC",
          role: "assistant",
          content:
            "Czy potrzebujesz laptopa do pracy biurowej, kreatywnej (np. edycja wideo, grafika), czy może do czegoś innego?",
          createdAt: "2024-09-15T12:37:13.410Z",
        },
        {
          id: "1eN5yn2",
          createdAt: "2024-09-15T12:37:16.193Z",
          role: "user",
          content: "obojetnie",
        },
        {
          id: "w4y12Vc",
          role: "assistant",
          content:
            "Czy preferujesz konkretny rozmiar ekranu, na przykład 13 cali, 14 cali, czy 16 cali?",
          createdAt: "2024-09-15T12:37:16.569Z",
        },
        {
          id: "1726403838394",
          role: "user",
          content: "nie",
        },
      ],
    },
    {
      id: "1726403857372",
      data: "2021-09-28",
      title: "Chat 3",
      results: [
        {
          title: "Rower górski Giant Talon 3 GE 2022 - POTESTOWY",
          price: "3 795,00 PLN",
          image:
            "https://image.ceneostatic.pl/data/products/6841103/i-giant-yukon-fx-2.jpg",
          link: "https://www.greenbike.pl/rower-gorski-giant-talon-3-ge-2022-potestowy-p-8199.html",
        },
        {
          title: "Giant XTC 29 2 | XTC Advanced 2 | Rower MTB | SLX +Carbnon",
          price: "13 395,00 PLN",
          image:
            "https://image.ceneostatic.pl/data/products/6841103/i-giant-yukon-fx-2.jpg",
          link: "https://www.greenbike.pl/rower-gorski-giant-xtc-advanced-29-2-ostatnia-sztuka-p-3591.html",
        },
        {
          title:
            "Giant Stance 29 2 | Rower górski fullsuspension | Trail AM 29",
          price: "27,50 PLN",
          image:
            "https://image.ceneostatic.pl/data/products/6841103/i-giant-yukon-fx-2.jpg",
          link: "https://www.greenbike.pl/rower-gorski-giant-stance-29-2-gratis-p-6522.html",
        },
      ],
      messages: [
        {
          id: "initial",
          role: "assistant",
          content: "Hej, czego dzisiaj poszukujesz?",
        },
        {
          id: "QyuaMrT",
          createdAt: "2024-09-15T12:37:40.544Z",
          role: "user",
          content: "rower",
        },
        {
          id: "tPLBtnr",
          role: "assistant",
          content:
            "Do jakiego rodzaju jazdy potrzebujesz roweru? Po mieście, w terenie, czy może na dłuższe wycieczki?",
          createdAt: "2024-09-15T12:37:41.236Z",
        },
        {
          id: "gRGQcXy",
          createdAt: "2024-09-15T12:37:44.247Z",
          role: "user",
          content: "teren",
        },
        {
          id: "rpshLLN",
          role: "assistant",
          content:
            "Czy masz preferencje co do typu roweru? Może górski (MTB), fatbike, czy może gravel?",
          createdAt: "2024-09-15T12:37:44.672Z",
        },
        {
          id: "DhuWsqH",
          createdAt: "2024-09-15T12:37:46.677Z",
          role: "user",
          content: "gorski",
        },
        {
          id: "BWmwfZ0",
          role: "assistant",
          content: "Jaki budżet chciałbyś przeznaczyć na rower górski?",
          createdAt: "2024-09-15T12:37:47.257Z",
        },
        {
          id: "kDKFgLY",
          createdAt: "2024-09-15T12:37:49.083Z",
          role: "user",
          content: "5000",
        },
        {
          id: "vPI3Frh",
          role: "assistant",
          content:
            "Czy masz preferencje co do marki lub konkretnego modelu? Na przykład Giant, Trek, Specialized?",
          createdAt: "2024-09-15T12:37:49.540Z",
        },
        {
          id: "1726403871643",
          role: "user",
          content: "giant",
        },
      ],
    },
    {
      id: "1726403884023",
      data: "2025-11-29",
      title: "Chat 4",
      results: [],
      messages: [
        {
          id: "initial",
          role: "assistant",
          content: "Hej, czego dzisiaj poszukujesz?",
        },
      ],
    },
    {
      id: "1726403885676",
      title: "Chat 5",
      results: [
        {
          title:
            'ASUS - ROG Zephyrus G14 14" 165Hz Gaming Laptop QHD- AMD Ryzen 9 with 16GB Memory-NVIDIA GeForce RTX 4060-512GB SSD - Moonlight White',
          price: "1,359.99 USD",
          image:
            "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6535/6535495cv15d.jpg",
          link: "https://www.bestbuy.com/site/asus-rog-zephyrus-g14-14-165hz-gaming-laptop-qhd-amd-ryzen-9-with-16gb-memory-nvidia-geforce-rtx-4060-512gb-ssd-moonlight-white/6535495.p",
        },
        {
          title:
            "ASUS ROG Zephyrus G14 (2024) review: The best 14-inch gaming laptop ...",
          price: "1,599.99 USD",
          image: "https://www.pbtech.co.nz/fileslib/_20230403122004_584.png",
          link: "https://www.windowscentral.com/hardware/laptops/asus/asus-rog-zephyrus-g14-2024-review",
        },
        {
          title: "ASUS ROG Zephyrus G14 (2024) review - Engadget",
          price: "1,600.00 USD",
          image:
            "https://dlcdnwebimgs.asus.com/gain/8D12A135-FBA7-4C6F-BB9D-A654F4398FFD/w1000/h732",
          link: "https://www.engadget.com/asus-rog-zephyrus-g14-2024-review--this-is-the-14-inch-gaming-laptop-to-beat-161524669.html",
        },
      ],
      messages: [
        {
          id: "initial",
          role: "assistant",
          content: "Hej, czego dzisiaj poszukujesz?",
        },
        {
          id: "1OyVFfi",
          createdAt: "2024-09-18T17:48:49.943Z",
          role: "user",
          content: "laptopa",
        },
        {
          id: "WUbOoJ0",
          role: "assistant",
          content:
            "Do jakich zastosowań głównie będziesz używać laptopa? Do gier, pracy biurowej, grafiki czy może czegoś innego?",
          createdAt: "2024-09-18T17:48:50.784Z",
        },
        {
          id: "MS6evrh",
          createdAt: "2024-09-18T17:48:52.781Z",
          role: "user",
          content: "do gier",
        },
        {
          id: "oBCyr4Q",
          role: "assistant",
          content:
            "Czy masz preferencje co do marki? Na przykład ASUS ROG, Dell Alienware czy Lenovo Legion?",
          createdAt: "2024-09-18T17:48:53.298Z",
        },
        {
          id: "x6QQ7KW",
          createdAt: "2024-09-18T17:48:55.326Z",
          role: "user",
          content: "asus rog",
        },
        {
          id: "qGqjFAW",
          role: "assistant",
          content:
            "Świetny wybór! Czy interesuje Cię konkretny model, na przykład ASUS ROG Zephyrus G14 lub ASUS ROG Strix G15? A może masz inne preferencje dotyczące specyfikacji, takie jak rozmiar ekranu czy wydajność karty graficznej?",
          createdAt: "2024-09-18T17:48:55.826Z",
        },
        {
          id: "HnUMqGh",
          createdAt: "2024-09-18T17:49:00.886Z",
          role: "user",
          content: "nie wiem polec cos",
        },
        {
          id: "q2qcT6p",
          role: "assistant",
          content:
            "Dobrze! ASUS ROG Zephyrus G14 to świetny laptop do gier, z mocnym procesorem i kartą graficzną, a także kompaktowym rozmiarem. Z kolei ASUS ROG Strix G15 oferuje większy ekran i lepszą wydajność w grach. Który z tych modeli bardziej Ci odpowiada? A może interesuje Cię coś innego?",
          createdAt: "2024-09-18T17:49:01.367Z",
        },
        {
          id: "1726681746051",
          role: "user",
          content: "ASUS ROG Zephyrus G14",
        },
      ],
    },
   
  ],
];
