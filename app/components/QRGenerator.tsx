"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Copy,
  Check,
  Palette,
  Settings2,
  Type,
  RefreshCw,
} from "lucide-react";

type ErrorCorrectionLevel = "L" | "M" | "H";
type Tab = "content" | "design" | "settings";

export default function QRGenerator() {
  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [text, setText] = useState("https://github.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<ErrorCorrectionLevel>("M");
  const [margin, setMargin] = useState(4);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!text || !canvasRef.current) return;
    setIsGenerating(true);

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
    } finally {
      setTimeout(() => setIsGenerating(false), 300);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQRCode();
    }, 100); // Debounce generation
    return () => clearTimeout(timer);
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

  const tabs = [
    { id: "content", label: "Content", icon: Type },
    { id: "design", label: "Design", icon: Palette },
    { id: "settings", label: "Settings", icon: Settings2 },
  ];

  return (
    <section id="generator" className="section-wrapper">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="heading-section">
          Generator <span className="text-gradient">Workstation</span>
        </h2>
        <p className="text-description">
          Professional tools for your perfect QR code
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Tabs Navigation */}
          <div className="glass-panel p-1.5 flex gap-1 sticky top-4 z-20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="glass-panel p-6 sm:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "content" && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="label-text">QR Content</label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter URL, text, or data..."
                      rows={5}
                      className="input-premium resize-none font-mono text-sm"
                    />
                    <p className="text-xs text-gray-400 mt-2 text-right">
                      {text.length} chars
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "design" && (
                <motion.div
                  key="design"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Foreground Color</label>
                      <div className="flex gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                          <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                          />
                        </div>
                        <input
                          type="text"
                          value={fgColor}
                          onChange={(e) => setFgColor(e.target.value)}
                          className="input-premium uppercase"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-text">Background Color</label>
                      <div className="flex gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                          <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                          />
                        </div>
                        <input
                          type="text"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="input-premium uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="label-text flex justify-between">
                      <span>Margin (Safe Zone)</span>
                      <span className="text-purple-500">{margin} blocks</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600 mt-2"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  <div>
                    <label className="label-text">Dimensions</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[128, 256, 512, 1024].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`px-4 py-3 rounded-xl border font-medium transition-all ${
                            size === s
                              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          {s}px
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label-text">Error Correction</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["L", "M", "H"] as ErrorCorrectionLevel[]).map(
                        (level) => (
                          <button
                            key={level}
                            onClick={() => setErrorCorrectionLevel(level)}
                            className={`px-4 py-3 rounded-xl border font-medium transition-all ${
                              errorCorrectionLevel === level
                                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                            }`}
                          >
                            {level}
                            <span className="block text-[10px] opacity-60 font-normal mt-0.5">
                              {level === "L"
                                ? "~7%"
                                : level === "M"
                                  ? "~15%"
                                  : "~30%"}
                            </span>
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Sticky Preview */}
        <div className="lg:col-span-7 relative">
          <div className="sticky top-24">
            <div className="glass-panel p-8 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-white p-6 rounded-4xl shadow-2xl mb-8 group"
              >
                <div
                  className={`transition-all duration-300 ${
                    isGenerating ? "blur-sm scale-[0.98] opacity-80" : ""
                  }`}
                >
                  <canvas ref={canvasRef} className="max-w-full h-auto" />
                </div>

                {/* Empty State / Loading Overlay */}
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
                  </div>
                )}
              </motion.div>

              <div className="flex flex-wrap gap-4 justify-center w-full max-w-md">
                <button
                  onClick={() => downloadQR("png")}
                  className="btn-premium-primary flex-1 group"
                >
                  <Download size={18} />
                  <span>Download PNG</span>
                  <div className="w-px h-4 bg-white/30 mx-2" />
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadQR("svg");
                    }}
                    className="text-xs opacity-80 hover:opacity-100 hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors"
                  >
                    SVG
                  </span>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="btn-premium-outline flex-1"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? "Copied!" : "Copy URL"}
                </button>
              </div>

              {/* Contrast Tip */}
              <div className="mt-8 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full border border-amber-200 dark:border-amber-900/30">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>
                  Tip: Dark foreground on light background is most scannable
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
