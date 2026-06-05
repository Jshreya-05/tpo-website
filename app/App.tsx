'use client';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Statistics } from './components/Statistics';
import { Training } from './components/Training';
import { Gallery } from './components/Gallery';
import { Recruiters } from './components/Recrutiers';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Statistics />
      <Training />
      <Gallery />
      <Recruiters />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
