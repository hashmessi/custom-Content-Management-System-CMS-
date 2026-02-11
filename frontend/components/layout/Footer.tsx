import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-bold font-outfit tracking-tight text-blue-500">
                Giakaa
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              AI-first consulting firm delivering high-impact solutions that drive measurable growth across 40+ industries.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 bg-gray-900 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5 text-gray-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-outfit">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Partners', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-outfit">Services</h4>
            <ul className="space-y-4">
              {['Digital Transformation', 'Data & AI', 'Cloud Engineering', 'Strategy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-outfit">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest insights.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-gray-900 text-white px-4 py-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2024 Giakaa. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
