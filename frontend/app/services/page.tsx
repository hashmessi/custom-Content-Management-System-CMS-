import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold font-outfit text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-12">
            AI-first solutions to transform your enterprise and drive measurable growth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service cards will be added here */}
            <p className="col-span-full text-center text-gray-500 py-12">
              Services content coming soon...
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
