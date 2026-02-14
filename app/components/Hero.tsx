"use client";

import { motion } from "framer-motion";
import { Sparkles, Lock, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-hidden">
      {/* Gradient Background - Removed in favor of global layout gradient */}

      {/* Animated Orbs */}
      <div className="absolute top-20 left-2 sm:left-10 w-32 h-32 sm:w-72 sm:h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div
        className="absolute bottom-20 right-2 sm:right-10 w-32 h-32 sm:w-72 sm:h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="glass-panel inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/50 dark:bg-white/5"
          >
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">
              100% FREE • NO WATERMARKS
            </span>
          </motion.div>

          <h1 className="heading-hero">
            Create Beautiful
            <br />
            <span className="text-gradient">QR Codes</span>
            <br />
            Instantly
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto text-balance px-2">
            Generate custom QR codes with full control over colors, size, and
            format. All processing happens in your browser for complete privacy.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <motion.a
              href="#generator"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium-primary"
            >
              Start Creating
            </motion.a>

            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium-outline"
            >
              Learn More
            </motion.a>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center items-center px-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Zap size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <span className="font-medium">Instant Generation</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Lock size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-medium">Privacy First</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Sparkles
                  size={20}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <span className="font-medium">Full Customization</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
