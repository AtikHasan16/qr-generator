import Hero from "./components/Hero";
import QRGenerator from "./components/QRGenerator";
import Features from "./components/Features";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <QRGenerator />
      <Features />
      <Footer />
    </main>
  );
}
