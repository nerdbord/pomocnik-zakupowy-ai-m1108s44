export type NAV_ITEM = {
  id: string;
  label: string;
  href: string;
};
[];

export type FEATURE_ITEM = {
  id: number;
  title: string;
  description: string;
};

export type FAQ_ITEM = {
  id: number;
  answer: string;
  question: string;
};

export type RESULTS = {
  length: number;
  map(
    arg0: ({
      image,
      title,
      price,
      link,
    }: RESULTS) => import("react").JSX.Element,
  ): import("react").ReactNode;
  image: string;
  title: string;
  price: string;
  link: string;
};
