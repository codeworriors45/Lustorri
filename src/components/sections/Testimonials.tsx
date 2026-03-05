"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from "lucide-react";
import { GradientOrb } from "@/components/animations";

const testimonials = [
  {
    id: 1,
    quote: "She said yes, and the ring was perfect. But what made her cry was the engraved card with our first 'I love you' written on it.",
    author: "Rahul & Priya",
    location: "Mumbai",
    universe: "The Proposal",
    rating: 5,
  },
  {
    id: 2,
    quote: "We chose 'The Wanderers' universe because that's who we are. The ring reminds us of every adventure we've taken together.",
    author: "Ananya & Vikram",
    location: "Bangalore",
    universe: "The Wanderers",
    rating: 5,
  },
  {
    id: 3,
    quote: "The story card made my husband cry — something I'd never seen before. It had the lyrics of our first dance song.",
    author: "Meera & Arjun",
    location: "Delhi",
    universe: "Wedding Day",
    rating: 5,
  },
  {
    id: 4,
    quote: "25 years together, and Lustorri gave us a way to remember every moment. The engraved card sits beside our wedding photo.",
    author: "Sunita & Rajesh",
    location: "Chennai",
    universe: "Anniversary",
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 lg:py-32 bg-linear-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <GradientOrb
          size="lg"
          color="rose"
          position="top-left"
          blur="xl"
          className="opacity-10"
        />
        <GradientOrb
          size="md"
          color="gold"
          position="bottom-right"
          blur="lg"
          className="opacity-10"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Heart className="w-4 h-4 text-primary fill-primary/30" />
            <span className="text-sm font-sans font-medium text-primary">
              Love Notes
            </span>
          </div>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4">
            Words From Our Couples
          </p>
          <p className="font-sans text-muted-foreground text-lg">
            Real stories, real emotions, real forever
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <Quote className="w-16 h-16 text-primary/20 fill-primary/10" />
          </div>

          <motion.div
            layout
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-background rounded-3xl shadow-xl border border-border/50 p-8 sm:p-12 flex flex-col justify-center items-center relative overflow-hidden min-h-[320px]"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center"
                layout
              >
                {/* Universe Badge */}
                <div className="mb-4">
                  <span className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-primary/70">
                    {testimonials[currentIndex].universe} Universe
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gold fill-gold"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl font-serif italic text-foreground leading-relaxed mb-8 max-w-2xl">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-display font-semibold text-foreground text-lg">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-sm font-sans text-muted-foreground">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 sm:-mx-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background shadow-lg border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background shadow-lg border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
