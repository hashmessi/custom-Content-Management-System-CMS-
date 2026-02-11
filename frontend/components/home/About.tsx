"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const About = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image Parallax effect could be added here */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 p-10 bg-gray-900/90 backdrop-blur-md rounded-3xl border border-gray-800 shadow-2xl"
          >
            <h2 className="text-5xl font-bold font-outfit text-white mb-8">
              About Us
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We are here to disrupt old ideas, blaze new trails, and help enterprises transform. 
              Our AI-first approach combines strategy, technology, and design to solve complex problems and create lasting value.
            </p>
            
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 text-blue-400 font-bold text-lg hover:text-blue-300 transition-colors group"
            >
              Contact us
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="lg:w-1/2"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
