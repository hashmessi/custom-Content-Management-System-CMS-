"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Tractor, Car, Landmark, FlaskConical, Radio, ShoppingBag, Shield, GraduationCap, Milk } from 'lucide-react';

const courses = [
  { title: 'Aerospace', icon: Plane, color: 'bg-blue-100 text-blue-600' },
  { title: 'Agriculture', icon: Tractor, color: 'bg-green-100 text-green-600' },
  { title: 'Automotive', icon: Car, color: 'bg-red-100 text-red-600' },
  { title: 'Banking', icon: Landmark, color: 'bg-yellow-100 text-yellow-600' },
  { title: 'Chemicals', icon: FlaskConical, color: 'bg-purple-100 text-purple-600' },
  { title: 'Telecom', icon: Radio, color: 'bg-indigo-100 text-indigo-600' },
  { title: 'Consumer Goods', icon: ShoppingBag, color: 'bg-pink-100 text-pink-600' },
  { title: 'Defense', icon: Shield, color: 'bg-gray-100 text-gray-600' },
];

const Industries = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-outfit text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Deep domain expertise across major sectors to drive innovation and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className={`w-14 h-14 rounded-lg ${item.color} flex items-center justify-center mb-6`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm">
                Transforming {item.title.toLowerCase()} with AI-driven solutions.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
