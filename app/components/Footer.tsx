"use client";

import { Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>using Next.js</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/AtikHasan16/qr-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Github size={18} />
              <span className="font-medium">View on GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} Free QR Code Generator. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
