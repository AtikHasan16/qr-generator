"use client";

import { Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>using Next.js</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/AtikHasan16/qr-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Github size={20} />
              <span className="font-medium">View on GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} Free QR Code Generator. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
