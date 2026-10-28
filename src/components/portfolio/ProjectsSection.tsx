import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Trophy } from "lucide-react";

import { FaGithub, FaBehance, FaLinkedin, FaInstagram } from "react-icons/fa";

import { SiKaggle, SiHuggingface } from "react-icons/si";

import ProjectShowcase from "@/components/portfolio/ProjectShowcase";
import { projects, socialProfiles, type Project } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Icon mapping
const iconMap = {
  github: FaGithub,
  behance: FaBehance,
  kaggle: SiKaggle,
  huggingface: SiHuggingface,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  zindi: Trophy,
};

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openProjectShowcase = (
    project: Project,
    trigger?: HTMLButtonElement | null,
  ) => {
    lastTriggerRef.current = trigger ?? null;
    setSelectedProject(project);
    setShowcaseOpen(true);
  };

  return (
    <>
      <ProjectShowcase
        project={selectedProject}
        open={showcaseOpen}
        onOpenChange={(open) => {
          setShowcaseOpen(open);

          if (!open) {
            setSelectedProject(null);
            window.setTimeout(() => {
              lastTriggerRef.current?.focus();
            }, 0);
          }
        }}
      />

      <section
        id="projects"
        ref={ref}
        className="py-20 bg-slate-50 dark:bg-slate-800"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div
              className={`mb-16 text-center transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-slate-100">
                Featured Projects
              </h2>

              <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-300">
                A showcase of my work across design, AI, and cybersecurity
                domains
              </p>
            </div>

            <div className="mb-16 grid gap-8 md:grid-cols-2">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`group overflow-hidden border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl opacity-50 transition-opacity duration-300 group-hover:opacity-70">
                        {project.category === "AI"
                          ? "🤖"
                          : project.category === "Cybersecurity"
                            ? "🔒"
                            : "🎨"}
                      </div>
                    </div>

                    <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 text-slate-900"
                      >
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="border-slate-300 text-xs text-slate-600 dark:border-slate-600 dark:text-slate-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(event) =>
                          openProjectShowcase(project, event.currentTarget)
                        }
                        className="flex-1 transition-colors duration-300 group-hover:border-blue-300 group-hover:text-blue-600 dark:group-hover:border-blue-600 dark:group-hover:text-blue-400"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Project
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div
              className={`transition-all duration-1000 delay-800 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <Card className="border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:border-slate-700 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardContent className="flex flex-col items-center p-8">
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                      Find Me Online
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300">
                      Connect with me across various platforms and explore more
                      of my work
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-0 gap-y-0 md:grid-cols-3 lg:grid-cols-6"></div>
                    {socialProfiles.map((profile) => {
                      const Icon =
                        iconMap[profile.icon as keyof typeof iconMap];

                      return (
                        <Button
                          key={profile.name}
                          variant="outline"
                          className="h-20 flex-col gap-2 border-slate-200 bg-white transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:bg-slate-50 hover:text-blue-600 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                          asChild
                        >
                          <a
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="text-2xl">{Icon && <Icon />}</div>

                            <span className="text-sm font-medium">
                              {profile.name}
                            </span>
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
