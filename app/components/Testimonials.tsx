import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export function Testimonials() {
  const ref = useRef(null);
  const sliderRef = useRef<any>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      company: 'Google',
      package: '18 LPA',
      image: 'https://images.unsplash.com/photo-1690166444493-b3f5fbcd4762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwZW5naW5lZXJ8ZW58MXx8fHwxNzcxNDg3OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      testimonial: 'The T&P Cell provided exceptional guidance throughout my placement journey. The mock interviews and technical training sessions were instrumental in helping me secure my dream job at Google.',
    },
    {
      name: 'Rahul Verma',
      role: 'Data Analyst',
      company: 'Microsoft',
      package: '15 LPA',
      image: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNDg3OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      testimonial: 'I am grateful to the placement team for their continuous support and mentorship. The aptitude training and communication workshops significantly improved my interview skills.',
    },
    {
      name: 'Anjali Patel',
      role: 'Full Stack Developer',
      company: 'Amazon',
      package: '16 LPA',
      image: 'https://images.unsplash.com/photo-1761125050322-bbfc155571bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZSUyMGluZGlhbiUyMHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDF8fHx8MTc3MTQ4MzE0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      testimonial: 'The comprehensive training programs and industry exposure helped me build the skills required for my role. The placement cell team went above and beyond to ensure our success.',
    },
    {
      name: 'Arjun Kumar',
      role: 'Consultant',
      company: 'Deloitte',
      package: '12 LPA',
      image: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNDg3OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      testimonial: 'The soft skills training and interview preparation sessions were game-changers. The placement officers were always available to guide us and answer our queries.',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-3 h-3 rounded-full bg-slate-300 hover:bg-slate-900 transition-colors mt-8"></div>
    ),
  };

  return (
    <section id="testimonials" ref={ref} className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-slate-700 font-bold text-sm sm:text-base inline-block mb-3 tracking-wider">
            STUDENT TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Success Stories from Our Alumni
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Hear from our students who achieved their career goals with our support
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-5xl mx-auto relative"
        >
          <div className="relative px-12 sm:px-16">
            <Slider ref={sliderRef} {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="px-4">
                  <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 relative">
                    {/* Quote Icon */}
                    <div className="absolute top-8 right-8 text-slate-200">
                      <Quote size={64} fill="currentColor" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                        {/* Image */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative"
                        >
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        </motion.div>

                        {/* Info */}
                        <div className="text-center sm:text-left">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">
                            {testimonial.name}
                          </h3>
                          <p className="text-slate-700 font-semibold mb-1">
                            {testimonial.role} at {testimonial.company}
                          </p>
                          <p className="text-slate-600 text-sm">
                            Package: <span className="font-bold text-slate-900">{testimonial.package}</span>
                          </p>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-slate-700 text-lg leading-relaxed italic">
                        "{testimonial.testimonial}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            {/* Navigation Buttons */}
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all z-10 border border-slate-200"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all z-10 border border-slate-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
