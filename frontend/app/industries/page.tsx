import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Industries from "@/components/home/Industries";

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        <Industries />
      </main>
      <Footer />
    </>
  );
}
