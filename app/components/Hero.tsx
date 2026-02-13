"use client";

import { motion } from "framer-motion";
import { Sparkles, Lock, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-bg opacity-10 dark:opacity-20" />

      {/* Animated Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 mb-6"
          >
            <Sparkles size={18} />
            <span className="text-sm font-medium">
              100% Free • No Watermarks • No Limits
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Create Beautiful
            <br />
            <span className="gradient-text">QR Codes</span>
            <br />
            Instantly
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto text-balance">
            Generate custom QR codes with full control over colors, size, and
            format. All processing happens in your browser for complete privacy.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <motion.a
              href="#generator"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Creating
            </motion.a>

            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-2xl font-semibold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              Learn More
            </motion.a>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-6 justify-center items-center">
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
