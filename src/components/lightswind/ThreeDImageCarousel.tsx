import OfficialThreeDImageCarousel from "@/components/lightswind/3d-image-carousel";

export type Slide = {
  id?: number;
  src: string;
  href?: string;
};

export type ThreeDImageCarouselProps = {
  slides: Slide[];
  itemCount?: 3 | 5;
  autoplay?: boolean;
  delay?: number;
  pauseOnHover?: boolean;
  className?: string;
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
};

export default function ThreeDImageCarousel({
  slides,
  itemCount = 5,
  autoplay = false,
  delay = 3,
  pauseOnHover = true,
  className = "",
  activeIndex,
  onActiveChange,
}: ThreeDImageCarouselProps) {
  const normalizedSlides = slides.map((slide, index) => ({
    id: slide.id ?? index + 1,
    src: slide.src,
    href: slide.href ?? "#",
  }));

  return (
    <OfficialThreeDImageCarousel
      slides={normalizedSlides}
      itemCount={itemCount}
      autoplay={autoplay}
      delay={delay}
      pauseOnHover={pauseOnHover}
      className={className}
      activeIndex={activeIndex}
      onActiveChange={onActiveChange}
    />
  );
}
