import { useEffect } from "react";
import FullPage from "@/components/fullpage/FullPage";
import MobileStack from "@/components/fullpage/MobileStack";
import { useIsMobile } from "@/hooks/use-is-mobile";
import {
  SlideProduction,
  SlideProblem,
  SlideProductsAndCases,
} from "@/components/fullpage/slides1to5";
import {
  SlideTestimonials,
  SlideFinal,
} from "@/components/fullpage/slides6to10";

// 5 slides — production-first / B2B (опт-first) funnel.
// Phase 6.3: merged former slides 02 (Виробництво повного циклу) and 04
// (20 років власного виробництва) into one comprehensive Manufacturing slide.
// Result: Hero → Виробництво (повний цикл · 20 років · photos) →
// Продукція + Кейси → Опт і партнери → Прайс.
const SLIDES = [
  SlideProduction,         // 01 — Hero
  SlideProblem,            // 02 — Виробництво повного циклу · 20 років (merged)
  SlideProductsAndCases,   // 03 — Продукція + Кейси
  SlideTestimonials,       // 04 — Опт і партнери
  SlideFinal,              // 05 — Прайс
];

const LABELS = [
  "Виробництво",
  "Виробництво · 20 років",
  "Продукція та кейси",
  "Опт і партнери",
  "Прайс",
];

export default function HomePage() {
  const isMobile = useIsMobile(768);

  useEffect(() => {
    // Apply home-lock ONLY on desktop. Mobile uses native vertical scroll
    // and must not be locked (otherwise no content reaches user).
    if (isMobile) {
      document.body.classList.remove("home-lock");
      document.documentElement.classList.remove("home-lock");
      document.body.classList.add("mobile-home");
    } else {
      document.body.classList.remove("mobile-home");
      document.body.classList.add("home-lock");
      document.documentElement.classList.add("home-lock");
    }
    return () => {
      document.body.classList.remove("home-lock");
      document.documentElement.classList.remove("home-lock");
      document.body.classList.remove("mobile-home");
    };
  }, [isMobile]);

  if (isMobile) {
    return <MobileStack slides={SLIDES} labels={LABELS} />;
  }

  return (
    <div className="fixed inset-0 z-0" data-testid="home-page">
      <FullPage slides={SLIDES} labels={LABELS} />
    </div>
  );
}
