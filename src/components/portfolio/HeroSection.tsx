"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ExternalLink } from "lucide-react";
import { useScrollToSection } from "@/hooks/useScrollAnimation";
import { TypeAnimation } from "react-type-animation";

export default function HeroSection() {
  const scrollToSection = useScrollToSection();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Animated Background Glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-blue-400 rounded-full blur-3xl opacity-20"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-indigo-400 rounded-full blur-3xl opacity-20 right-0 bottom-0"
        animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <div className="container mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
        >
          {/* LEFT */}
          <div className="space-y-8">
            <motion.div variants={fadeUp}>
              <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-700">
                Available for opportunities
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              <TypeAnimation
                sequence={[
                  "GATAMBA Louis Prince",
                  3000,
                  "GATAMBA Louis Prince",
                  1000,
                  "Louis Prince GATAMBA",
                  1000,
                ]}
                speed={50}
                repeat={Infinity}
                wrapper="span"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              />
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-xl"
            >
              I design and build secure, AI-powered digital experiences.
            </motion.p>

            {/* BUTTONS */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Explore My Work
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>

            {/* TRUST LINE */}
            <motion.div
              variants={fadeUp}
              className="text-sm text-slate-500 flex gap-3 flex-wrap"
            >
              <span>3+ Projects</span>
              <span>•</span>
              <span>AI & Cybersecurity</span>
              <span>•</span>
              <span>React • Figma • UI UX • CyberSecurity • Networking</span>
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative w-[640px] h-[640px]"
            >
              {/* Gradient Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-[4px]">
                <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-900">
                  <img
                    src="IMG_3085.PNG"
                    alt="profile"
                    className="w-full h-2xl object-cover"
                  />
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full text-xs shadow">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Available
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <Button variant="ghost" onClick={() => scrollToSection("about")}>
            <ArrowDown />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
