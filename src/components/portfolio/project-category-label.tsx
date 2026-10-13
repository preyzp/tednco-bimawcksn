import type { PortfolioProject } from "@/data/portfolio";
import type { Locale } from "@/i18n/routing";

const categoryLabels: Record<Locale, Record<PortfolioProject["category"], string>> = {
  en: {
    Photography: "PHOTOGRAPHY",
    Film: "WEDDING FILM",
    "Photography & Film": "PHOTOGRAPHY & FILM",
  },
  id: {
    Photography: "FOTOGRAFI",
    Film: "FILM PERNIKAHAN",
    "Photography & Film": "FOTOGRAFI & FILM",
  },
};

export function ProjectCategoryLabel({ category, locale }: { category: PortfolioProject["category"]; locale: Locale }) {
  return <span className="project-category-label">{categoryLabels[locale][category]}</span>;
}
