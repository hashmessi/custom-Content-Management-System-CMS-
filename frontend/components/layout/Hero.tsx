"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSlide {
  _id: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  isActive: boolean;
  displayOrder: number;
}

const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetchHeroSlides();
  }, []);

  const fetchHeroSlides = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const response = await fetch(`${apiUrl}/hero-slides/active`);
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setSlides(data.data);
      } else {
        // Fallback to default slide if no slides from API
        setSlides([{
          _id: 'default',
          title: 'Empowering Enterprise',
          subtitle: 'AI-first consulting firm delivering high-impact solutions that drive measurable growth across 40+ industries.',
          ctaText: "Let's Talk",
          ctaLink: '/contact',
          isActive: true,
          displayOrder: 0
        }]);
      }
    } catch (error) {
      console.error('Failed to fetch hero slides:', error);
      // Fallback to default slide
      setSlides([{
        _id: 'default',
        title: 'Empowering Enterprise',
        subtitle: 'AI-first consulting firm delivering high-impact solutions that drive measurable growth across 40+ industries.',
        ctaText: "Let's Talk",
        ctaLink: '/contact',
        isActive: true,
        displayOrder: 0
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-advance slides
  useEffect(() => {
    if (slides.length <= 1) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length, currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading...</div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  const slide = slides[currentSlide];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900 text-white">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide._id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          {slide.imageUrl ? (
            <div className="absolute inset-0">
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
            </div>
          ) : (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
            </div>
          )}
          
          {/* Content */}
          <div className="container mx-auto px-6 h-full flex items-center relative z-10">
            <div className="max-w-3xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold font-outfit leading-tight mb-6"
              >
                {slide.title.split(' ').map((word, index) => (
                  index === 1 ? (
                    <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      {word}{' '}
                    </span>
                  ) : (
                    <span key={index}>{word} </span>
                  )
                ))}
              </motion.h1>
              
              {slide.subtitle && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
                >
                  {slide.subtitle}
                </motion.p>
              )}
              
              {slide.ctaText && slide.ctaLink && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link
                    href={slide.ctaLink}
                    className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
                  >
                    <span className="font-semibold text-lg">{slide.ctaText}</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Only show if multiple slides */}
      {slides.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
