import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-auto">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover" href="#generator">
          Generator
        </a>
        <a className="link link-hover" href="#features">
          Features
        </a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link
            href="https://github.com/AtikHasan16/qr-generator"
            target="_blank"
            className="btn btn-ghost btn-circle"
          >
            <Github size={24} />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="btn btn-ghost btn-circle"
          >
            <Twitter size={24} />
          </Link>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by QR
          Generator
        </p>
      </aside>
    </footer>
  );
}
