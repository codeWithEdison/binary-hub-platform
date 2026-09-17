export const HERO_SLIDE_LIMITS = {
  title: 60,
  descriptionMin: 40,
  description: 180,
  buttonLabel: 24,
  buttonUrl: 200,
} as const;

export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image_url: string;
  button_label: string;
  button_url: string;
  sort_order: number;
  published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type HeroSlideInput = Omit<HeroSlide, "id" | "created_at" | "updated_at">;
