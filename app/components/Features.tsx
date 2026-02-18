"use client";

import {
  Zap,
  Shield,
  Sparkles,
  Download,
  Layers,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Generate QR codes instantly in your browser with no server latency.",
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    desc: "Your data never leaves your device. All processing is local.",
  },
  {
    icon: Sparkles,
    title: "Custom Design",
    desc: "Customize colors, margins, and error correction levels.",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    desc: "Download in high-quality PNG or scalable SVG formats.",
  },
  {
    icon: Layers,
    title: "Transparent Backgrounds",
    desc: "Create codes with transparent backgrounds for any design.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    desc: "Responsive design works perfectly on desktop, tablet, and mobile.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            Packed with professional features, free forever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="card bg-base-200/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow border border-white/5"
            >
              <div className="card-body">
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <h3 className="card-title text-lg">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
