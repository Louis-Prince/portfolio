import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { skills, downloadableFiles, personalInfo } from '@/lib/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" ref={ref} className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              About Me
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A passionate creative professional bridging the gap between beautiful design and cutting-edge technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-black to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-center h-full text-6xl">
                    <img src="aboutImg.png" alt="about img"/>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                  <span className="font-semibold">Available for hire</span>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Multi-disciplinary Creative Professional
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  I'm a versatile professional with expertise spanning graphic design, UI/UX, artificial intelligence, 
                  networking, and cybersecurity. My unique blend of creative and technical skills allows me to approach 
                  problems from multiple angles and deliver innovative solutions.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  I thrive on challenges that require both analytical thinking and creative problem-solving, whether 
                  it's designing intuitive user interfaces, developing AI models, or securing digital infrastructures.
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Core Skills</h4>
                <div className="grid gap-4">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{skill.name}</span>
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                          animationDuration: '1000ms'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Intro Video */}
          <div className={`mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Get to Know Me Better
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Watch my introduction video to learn more about my journey and passion
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
          <div className={`mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
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