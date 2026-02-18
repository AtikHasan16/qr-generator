import Link from "next/link";
import { Sparkles, Lock, Zap } from "lucide-react";

export default function Hero() {
  return (
    <div className="hero min-h-[60vh] py-10 z-10 relative">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <div className="badge badge-primary badge-outline mb-4 gap-2 p-3">
            <Sparkles size={14} />
            100% FREE • NO WATERMARKS
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary mb-6">
            Create Beautiful QR Codes
          </h1>
          <p className="py-6 text-lg opacity-80">
            Generate custom QR codes with full control over colors, size, and
            format. Secure, client-side, and instant.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="#generator" className="btn btn-primary">
              Generate QR Code
            </Link>
            <Link href="#features" className="btn btn-ghost">
              Learn More
            </Link>
          </div>

          <div className="flex gap-4 justify-center mt-12 opacity-70 text-sm">
            <div className="flex items-center gap-1">
              <Zap size={16} /> Instant
            </div>
            <div className="flex items-center gap-1">
              <Lock size={16} /> Secure
            </div>
            <div className="flex items-center gap-1">
              <Sparkles size={16} /> Custom
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
