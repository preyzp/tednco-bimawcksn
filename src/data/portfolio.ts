export type PortfolioProject = {
  slug: string;
  title: string;
  category: "Photography" | "Film" | "Photography & Film";
  coverImage: string;
  coverImageAlt: string;
  mood: string;
  description: string;
  gallery: { src: string; alt: string }[];
};

// Temporary Unsplash imagery and editorial names for layout development only.
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "a-day-to-remember",
    title: "A Day to Remember",
    category: "Photography & Film",
    coverImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1800&q=85",
    coverImageAlt: "Wedding couple sharing a quiet moment outdoors — temporary demo image",
    mood: "Natural & candid",
    description: "A temporary editorial demo story exploring the honest, unhurried moments around a wedding day.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85", alt: "Wedding celebration with guests — temporary demo image" },
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85", alt: "Wedding couple outdoors — temporary demo image" },
    ],
  },
  {
    slug: "between-two-hearts",
    title: "Between Two Hearts",
    category: "Photography",
    coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85",
    coverImageAlt: "Couple together in a garden — temporary demo image",
    mood: "Intimate & emotional",
    description: "A temporary editorial demo story shaped around closeness, connection, and the in-between.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1600&q=85", alt: "Wedding couple embracing — temporary demo image" },
      { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1600&q=85", alt: "Wedding ceremony details — temporary demo image" },
    ],
  },
  {
    slug: "a-quiet-kind-of-forever",
    title: "A Quiet Kind of Forever",
    category: "Film",
    coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1800&q=85",
    coverImageAlt: "Wedding ceremony in warm light — temporary demo image",
    mood: "Cinematic & editorial",
    description: "A temporary editorial demo story with a quieter, cinematic point of view.",
    gallery: [
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85", alt: "Wedding reception — temporary demo image" },
      { src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=85", alt: "Couple at an outdoor wedding — temporary demo image" },
    ],
  },
];
