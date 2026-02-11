import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold font-outfit text-gray-900 mb-6">
            Insights & Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-12">
            Latest insights on enterprise transformation, AI innovation, and industry trends.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              Looking for our blog content?
            </p>
            <Link 
              href="/blog"
              className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Visit Our Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
