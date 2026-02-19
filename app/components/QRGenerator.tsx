"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Download,
  Copy,
  Check,
  Settings2,
  Palette,
  Type,
  X,
  RotateCcw,
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

  const generateQRCode = useCallback(async () => {
    if (!text || !canvasRef.current) return;
    setIsGenerating(true);

    try {
      const QRCode = (await import("qrcode")).default;
      await QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        margin: margin,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: errorCorrectionLevel,
      });
    } catch (err) {
      console.error("Error generating QR code:", err);
    } finally {
      setIsGenerating(false);
    }
  }, [text, size, margin, fgColor, bgColor, errorCorrectionLevel]);

  useEffect(() => {
    const timer = setTimeout(() => generateQRCode(), 100);
    return () => clearTimeout(timer);
  }, [generateQRCode]);

  const downloadQR = async (format: "png" | "svg") => {
    if (format === "png" && canvasRef.current) {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `qrcode-${Date.now()}.png`;
      link.href = url;
      link.click();
    } else if (format === "svg") {
      const QRCode = (await import("qrcode")).default;
      const svgString = await QRCode.toString(text, {
        type: "svg",
        width: size,
        margin: margin,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: errorCorrectionLevel,
      });
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `qrcode-${Date.now()}.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const copyToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const resetDesign = () => {
    setFgColor("#000000");
    setBgColor("#ffffff");
    setMargin(4);
  };

  return (
    <section id="generator" className="py-10 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Controls Card */}
        <div className="card bg-base-200/90 backdrop-blur-sm shadow-xl flex-1 h-fit border border-white/5 rounded-3xl">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Configuration</h2>
              {activeTab === "design" && (
                <button
                  onClick={resetDesign}
                  className="btn btn-ghost btn-xs gap-1 text-base-content/60 hover:text-base-content"
                  title="Reset to default design"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              )}
            </div>

            <div
              role="tablist"
              className="tabs tabs-boxed w-full mb-6 bg-base-300/50 p-1 grid grid-cols-3"
            >
              <a
                role="tab"
                className={`tab ${activeTab === "content" ? "tab-active bg-primary text-primary-content shadow-sm" : ""} h-10`}
                onClick={() => setActiveTab("content")}
              >
                <div className="flex items-center gap-2">
                  <Type size={16} /> <span>Content</span>
                </div>
              </a>
              <a
                role="tab"
                className={`tab ${activeTab === "design" ? "tab-active bg-primary text-primary-content shadow-sm" : ""} h-10`}
                onClick={() => setActiveTab("design")}
              >
                <div className="flex items-center gap-2">
                  <Palette size={16} /> <span>Design</span>
                </div>
              </a>
              <a
                role="tab"
                className={`tab ${activeTab === "settings" ? "tab-active bg-primary text-primary-content shadow-sm" : ""} h-10`}
                onClick={() => setActiveTab("settings")}
              >
                <div className="flex items-center gap-2">
                  <Settings2 size={16} /> <span>Settings</span>
                </div>
              </a>
            </div>

            <div className="min-h-[300px]">
              {activeTab === "content" && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">QR Content</span>
                  </label>
                  <div className="relative">
                    <textarea
                      className="textarea textarea-bordered h-32 font-mono text-sm w-full"
                      placeholder="Enter URL or text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    {text && (
                      <button
                        className="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost opacity-50 hover:opacity-100"
                        onClick={() => setText("")}
                        title="Clear text"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <label className="label">
                    <span className="label-text-alt">{text.length} chars</span>
                  </label>
                </div>
              )}

              {activeTab === "design" && (
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Foreground</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="h-10 w-12 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="input input-bordered w-full uppercase"
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Background</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-12 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="input input-bordered w-full uppercase"
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Margin: {margin}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="range range-xs"
                    />
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Size (px)</span>
                    </label>
                    <div className="join w-full">
                      {[128, 256, 512, 1024].map((s) => (
                        <input
                          key={s}
                          className="join-item btn w-1/4"
                          type="radio"
                          name="size"
                          aria-label={`${s}`}
                          checked={size === s}
                          onChange={() => setSize(s)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Error Correction</span>
                    </label>
                    <div className="join w-full">
                      {(["L", "M", "H"] as ErrorCorrectionLevel[]).map((l) => (
                        <input
                          key={l}
                          className="join-item btn w-1/3"
                          type="radio"
                          name="ec"
                          aria-label={l}
                          checked={errorCorrectionLevel === l}
                          onChange={() => setErrorCorrectionLevel(l)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="card bg-base-200 shadow-xl flex-1 flex items-center justify-center p-8 text-center rounded-3xl">
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6 relative">
            <canvas ref={canvasRef} className="max-w-full h-auto" />
            {isGenerating && (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center backdrop-blur-sm rounded-xl">
                <span className="loading loading-spinner text-primary"></span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => downloadQR("png")}
              className="btn btn-primary w-full"
            >
              <Download size={18} /> Download PNG
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => downloadQR("svg")}
                className="btn btn-outline btn-sm"
              >
                SVG
              </button>
              <button
                onClick={copyToClipboard}
                className="btn btn-outline btn-sm"
              >
                {copied ? (
                  <Check size={14} className="text-success" />
                ) : (
                  <Copy size={14} />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
