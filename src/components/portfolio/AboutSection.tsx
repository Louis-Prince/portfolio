import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb, type LucideIcon } from "lucide-react";
import { skills, downloadableFiles, personalInfo } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skillCategoryStyles = {
  Design: {
    chip: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800/80 dark:bg-indigo-500/10 dark:text-indigo-200",
    icon: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300",
    bar: "from-indigo-500 to-violet-500",
    track: "bg-slate-200 dark:bg-slate-700",
  },
  "Tech and security": {
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/80 dark:bg-emerald-500/10 dark:text-emerald-200",
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
    bar: "from-emerald-500 to-teal-500",
    track: "bg-slate-200 dark:bg-slate-700",
  },
  Mindset: {
    chip: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/80 dark:bg-amber-500/10 dark:text-amber-200",
    icon: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
    bar: "from-amber-500 to-orange-500",
    track: "bg-slate-200 dark:bg-slate-700",
  },
} as const;

const getSkillLevelLabel = (level: number) => {
  if (level >= 90) return "90%+ Expert";
  if (level >= 80) return "80%+ Advanced";
  if (level >= 70) return "70%+ Proficient";
  return "60%+ Growing";
};

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const skillsSectionRef = useRef<HTMLDivElement | null>(null);
  const [animateSkills, setAnimateSkills] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!skillsSectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(skillsSectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animateSkills) {
      setAnimatedLevels(
        Object.fromEntries(
          skills.map((skill) => [skill.name, reducedMotion ? skill.level : 0]),
        ),
      );
      return;
    }

    if (reducedMotion) {
      setAnimatedLevels(
        Object.fromEntries(skills.map((skill) => [skill.name, skill.level])),
      );
      return;
    }

    let animationFrameIds: number[] = [];

    skills.forEach((skill, index) => {
      const startValue = 0;
      const duration = 900 + index * 120;
      const startTime = performance.now();

      const updateValue = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.round(
          startValue + (skill.level - startValue) * progress,
        );

        setAnimatedLevels((previous) => ({
          ...previous,
          [skill.name]: currentValue,
        }));

        if (progress < 1) {
          animationFrameIds.push(requestAnimationFrame(updateValue));
        }
      };

      animationFrameIds.push(requestAnimationFrame(updateValue));
    });

    return () => {
      animationFrameIds.forEach((frameId) => cancelAnimationFrame(frameId));
    };
  }, [animateSkills, reducedMotion]);

  return (
    <section id="about" ref={ref} className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              About Me
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A passionate creative professional bridging the gap between
              beautiful design and cutting-edge technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div
              className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-black to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-center h-full text-6xl">
                    <img src="IMG_2911.PNG" alt="about img" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                  <span className="font-semibold">Available for hire</span>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Multi-disciplinary Creative Professional
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  I'm a versatile professional with expertise spanning graphic
                  design, UI/UX, artificial intelligence, networking, and
                  cybersecurity. My unique blend of creative and technical
                  skills allows me to approach problems from multiple angles and
                  deliver innovative solutions.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  I thrive on challenges that require both analytical thinking
                  and creative problem-solving, whether it's designing intuitive
                  user interfaces, developing AI models, or securing digital
                  infrastructures.
                </p>
              </div>

              {/* Skills */}
              <div ref={skillsSectionRef} className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Core Skills
                  </h4>
                </div>

                <div className="grid gap-2.5 md:grid-cols-2">
                  {skills.map((skill) => {
                    const Icon = (skill.icon ?? Lightbulb) as LucideIcon;
                    const categoryStyle =
                      skillCategoryStyles[
                        skill.category as keyof typeof skillCategoryStyles
                      ];
                    const displayValue = animatedLevels[skill.name] ?? 0;

                    return (
                      <div
                        key={skill.name}
                        className={`rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${categoryStyle.icon}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  {skill.name}
                                </p>
                                <p className="mt-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                  {getSkillLevelLabel(skill.level)}
                                </p>
                              </div>

                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                {displayValue}%
                              </span>
                            </div>

                            <div className="mt-2">
                              <div
                                className={`h-1.5 w-full overflow-hidden rounded-full ${categoryStyle.track}`}
                                role="progressbar"
                                aria-label={`${skill.name} proficiency`}
                                aria-valuenow={displayValue}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className={`h-full rounded-full bg-gradient-to-r ${categoryStyle.bar} transition-[width] duration-1000 ease-out`}
                                  style={{ width: `${displayValue}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Intro Video */}
          <div
            className={`mt-16 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Get to Know Me Better
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Watch my introduction video to learn more about my journey and
                passion
              </p>
            </div>
            <div className="relative max-w-4xl mx-auto group">
              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <iframe
                  src={personalInfo.introVideo}
                  title="Introduction Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Downloadable Materials */}
          <div
            className={`mt-16 transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Communication Materials
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Download my professional documents and portfolio materials
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {downloadableFiles.map((file) => (
                    <Button
                      key={file.name}
                      variant="outline"
                      className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {file.name}
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {file.type}
                        </Badge>
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
