import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Industries from "@/components/home/Industries";
import About from "@/components/home/About";
import Footer from "@/components/layout/Footer";
import { generateOrganizationSchema, renderJsonLd } from "@/lib/seo";

export default function Home() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(organizationSchema)}
      />
      
      <main className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <Industries />
        <About />
        <Footer />
      </main>
    </>
  );
}
