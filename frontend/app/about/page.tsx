import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import About from "@/components/home/About";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        <About />
      </main>
      <Footer />
    </>
  );
}
