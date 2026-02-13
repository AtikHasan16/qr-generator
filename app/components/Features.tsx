"use client";

import { motion } from "framer-motion";
import { Palette, Download, Zap, Lock, Settings2, Share2 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Real-time QR code generation as you type with zero delay",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Palette,
    title: "Full Customization",
    description: "Customize colors, sizes, error correction, and margins",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Download as PNG or SVG for any use case you need",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "100% client-side processing - your data never leaves your device",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Settings2,
    title: "Advanced Options",
    description: "Fine-tune error correction levels and margin spacing",
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Copy to clipboard with one click for instant sharing",
    gradient: "from-pink-400 to-rose-500",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to create professional QR codes for any purpose
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div
                className={`inline-flex p-3 bg-linear-to-r ${feature.gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="text-white" size={24} />
              </div>

              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
