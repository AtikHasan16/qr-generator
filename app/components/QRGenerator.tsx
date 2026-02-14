"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import { Download, Copy, Check, Palette, Settings2 } from "lucide-react";

type ErrorCorrectionLevel = "L" | "M" | "H";

export default function QRGenerator() {
  const [text, setText] = useState("https://github.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<ErrorCorrectionLevel>("M");
  const [margin, setMargin] = useState(4);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!text || !canvasRef.current) return;

    try {
      await QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorCorrectionLevel,
      });
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  useEffect(() => {
    generateQRCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, size, fgColor, bgColor, errorCorrectionLevel, margin]);

  const downloadQR = (format: "png" | "svg") => {
    if (format === "png" && canvasRef.current) {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `qrcode-${Date.now()}.png`;
      link.href = url;
      link.click();
    } else if (format === "svg") {
      QRCode.toString(text, {
        type: "svg",
        width: size,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorCorrectionLevel,
      }).then((svgString) => {
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `qrcode-${Date.now()}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    }
  };

  const copyToClipboard = async () => {
    if (!canvasRef.current) return;

    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current!.toBlob((blob) => {
          if (blob) resolve(blob);
        });
      });

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="generator" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Generate Your <span className="gradient-text">QR Code</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
            Customize every detail and download in your preferred format
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* QR Code Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px]"
          >
            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => downloadQR("png")}
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-purple-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Download size={18} className="sm:w-5 sm:h-5" />
                Download PNG
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => downloadQR("svg")}
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Download size={18} className="sm:w-5 sm:h-5" />
                Download SVG
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-xl font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? "Copied!" : "Copy"}
              </motion.button>
            </div>
          </motion.div>

          {/* Customization Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Settings2 className="text-purple-600" size={24} />
              <h3 className="text-xl sm:text-2xl font-bold">Customize</h3>
            </div>

            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Content *
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Size: {size}px
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[128, 256, 512, 1024].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      size === s
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2">
                  <Palette size={16} />
                  Foreground
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-700"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <Palette size={16} />
                  Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-700"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Error Correction */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Error Correction Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["L", "M", "H"] as ErrorCorrectionLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setErrorCorrectionLevel(level)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      errorCorrectionLevel === level
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {level}
                    <span className="text-xs block opacity-80">
                      {level === "L" ? "~7%" : level === "M" ? "~15%" : "~30%"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Margin */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Margin: {margin}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
