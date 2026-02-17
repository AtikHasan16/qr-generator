import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// Lazy load heavy components
const QRGenerator = dynamic(() => import("./components/QRGenerator"), {
  loading: () => (
    <div className="min-h-[600px] animate-pulse bg-gray-100 dark:bg-gray-800/30 rounded-3xl mx-4 my-12" />
  ),
});

const Features = dynamic(() => import("./components/Features"), {
  loading: () => <div className="min-h-[400px]" />,
});

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
