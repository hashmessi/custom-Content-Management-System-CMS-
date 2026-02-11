"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100 py-3'
          : 'bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className={cn(
            "flex items-center gap-2 transition-all",
            isScrolled ? "" : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          )}>
            <span className={cn(
              "text-3xl font-bold font-outfit tracking-tight transition-colors",
              isScrolled ? "text-blue-600" : "text-white"
            )}>
              Giakaa
            </span>
            <span className={cn(
              "hidden sm:block h-8 w-px transition-colors",
              isScrolled ? "bg-gray-300" : "bg-white/40"
            )}></span>
            <span className={cn(
              "hidden sm:flex flex-col text-[10px] uppercase tracking-[0.15em] font-bold leading-tight transition-colors",
              isScrolled ? "text-gray-600" : "text-white/90"
            )}>
              <span>Growth</span>
              <span>For All</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-semibold transition-all hover:scale-105 relative group',
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white drop-shadow-md'
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full",
                isScrolled ? "bg-blue-600" : "bg-white"
              )}></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95",
              isScrolled 
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30" 
                : "bg-white hover:bg-blue-50 text-blue-600 shadow-xl shadow-black/20"
            )}
          >
            Contact us
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "lg:hidden p-2 rounded-lg transition-colors",
            isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact us
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
