"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Download,
  Zap,
  Lock,
  Settings2,
  Share2,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Real-time QR code generation as you type with zero delay.",
    gradient: "from-amber-400 to-orange-500",
    delay: 0.1,
  },
  {
    icon: Palette,
    title: "Full Customization",
    description: "Control every detail: colors, sizes, error correction loops.",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2,
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Export high-resolution PNGs or scalable SVGs instantly.",
    gradient: "from-cyan-400 to-blue-500",
    delay: 0.3,
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "100% client-side processing. Your data never leaves your browser.",
    gradient: "from-emerald-400 to-green-500",
    delay: 0.4,
  },
  {
    icon: Settings2,
    title: "Pro Settings",
    description:
      "Fine-tune margins and error correction for reliable scanning.",
    gradient: "from-indigo-500 to-violet-500",
    delay: 0.5,
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description:
      "One-click copy to clipboard for seamless workflow integration.",
    gradient: "from-pink-500 to-rose-500",
    delay: 0.6,
  },
];

export default function Features() {
  return (
    <section id="features" className="section-wrapper">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6"
        >
          <Sparkles size={16} />
          <span>Premium Features Free</span>
        </motion.div>

        <h2 className="heading-section">
          Everything You <span className="text-gradient">Need</span>
        </h2>
        <p className="text-description">
          A complete toolkit for professional QR code generation
        </p>
      </div>

      <div className="grid-bento">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: feature.delay }}
            whileHover={{ y: -8 }}
            className="glass-panel p-8 hover:border-purple-500/30 transition-all duration-500 group"
          >
            <div
              className={`inline-flex p-3.5 rounded-2xl bg-linear-to-br ${feature.gradient} text-white mb-6 shadow-lg shadow-purple-500/10 group-hover:scale-110 transition-transform duration-300`}
            >
              <feature.icon size={24} />
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
