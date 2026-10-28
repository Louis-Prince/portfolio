import { useEffect, useMemo, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import ThreeDImageCarousel from "../lightswind/ThreeDImageCarousel";
import type { Project, ProjectImage } from "@/lib/data";

type ProjectShowcaseProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const getProjectImages = (project: Project): ProjectImage[] =>
  project.images.map((image, index) => {
    if (typeof image === "string") {
      return {
        src: image,
        alt: `${project.title} project view ${index + 1}`,
        caption: "",
      };
    }

    return {
      src: image.src,
      alt: image.alt || `${project.title} project view ${index + 1}`,
      caption: image.caption || "",
    };
  });

export default function ProjectShowcase({
  project,
  open,
  onOpenChange,
}: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCaptionVisible, setIsCaptionVisible] = useState(true);
  const titleId = useRef(`project-${project?.id ?? "gallery"}-title`);

  const normalizedProjectImages = useMemo(
    () => (project ? getProjectImages(project) : []),
    [project],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpenChange, open]);

  useEffect(() => {
    if (open) {
      setActiveIndex(0);
    }
  }, [open, project?.id]);

  useEffect(() => {
    setIsCaptionVisible(false);
    const timer = window.setTimeout(() => setIsCaptionVisible(true), 80);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    if (!open || !project || normalizedProjectImages.length === 0) {
      return;
    }

    const handleKeyNavigation = (event: KeyboardEvent) => {
      const total = normalizedProjectImages.length;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, total - 1));
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyNavigation);
    return () => window.removeEventListener("keydown", handleKeyNavigation);
  }, [open, project, normalizedProjectImages.length]);

  if (!project || !project.images?.length) {
    return null;
  }

  const slides = normalizedProjectImages.map((image, index) => ({
    id: index + 1,
    src: image.src,
    href: "#",
  }));

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* White frosted glass: the page behind stays visible, but blurred */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-white/25 backdrop-blur-[6px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none" />
        <DialogPrimitive.Content
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId.current}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-3 text-slate-900 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none sm:px-6 lg:px-10"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <DialogPrimitive.Title id={titleId.current} className="sr-only">
            {project.title} gallery
          </DialogPrimitive.Title>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            aria-label="Close project gallery"
            className="absolute right-4 top-4 z-30 h-11 w-11 rounded-full border border-slate-900/10 bg-white/80 text-slate-900 shadow-lg backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/60"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="relative z-10 flex w-full max-w-6xl items-center justify-center">
            <div className="w-full">
              <div className="mb-1 text-center -translate-y-16 sm:-translate-y-20">
                <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                  {project.title}
                </h3>
              </div>

              <div className="mx-auto max-w-5xl">
                <ThreeDImageCarousel
                  slides={slides}
                  itemCount={3}
                  autoplay={true}
                  delay={3}
                  pauseOnHover={true}
                  activeIndex={activeIndex}
                  onActiveChange={(index) => setActiveIndex(index)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
