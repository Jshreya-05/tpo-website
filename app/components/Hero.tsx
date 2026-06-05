import { motion } from 'motion/react';
import { ArrowRight, Award, Users, Briefcase } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block"
            >
              <span className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                Excellence in Placements
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
            >
              Building Careers,
              <span className="block mt-2 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Shaping Futures
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed"
            >
              Empowering students with industry-ready skills and connecting them with top recruiters worldwide. Your journey to a successful career starts here.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              <div className="text-center lg:text-left bg-white rounded-xl p-4 shadow-md border border-slate-200">
                <div className="flex items-center gap-2 text-slate-900 mb-1">
                  <Award size={20} className="text-slate-700" />
                  <span className="text-2xl sm:text-3xl font-bold">95%</span>
                </div>
                <p className="text-sm text-slate-600">Placement Rate</p>
              </div>
              <div className="text-center lg:text-left bg-white rounded-xl p-4 shadow-md border border-slate-200">
                <div className="flex items-center gap-2 text-slate-900 mb-1">
                  <Briefcase size={20} className="text-slate-700" />
                  <span className="text-2xl sm:text-3xl font-bold">250+</span>
                </div>
                <p className="text-sm text-slate-600">Recruiters</p>
              </div>
              <div className="text-center lg:text-left bg-white rounded-xl p-4 shadow-md border border-slate-200">
                <div className="flex items-center gap-2 text-slate-900 mb-1">
                  <Users size={20} className="text-slate-700" />
                  <span className="text-2xl sm:text-3xl font-bold">1200+</span>
                </div>
                <p className="text-sm text-slate-600">Students Placed</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(15, 23, 42, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                Explore Opportunities
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-900 px-8 py-4 rounded-xl border-2 border-slate-900 hover:bg-slate-50 transition-all shadow-lg font-semibold"
              >
                View Statistics
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Glassmorphism Card */}
              <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1746640546704-74e784dcd986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwbGFjZW1lbnQlMjBvZmZpY2VyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNDg3OTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Placement Officer"
                  className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl"
                />
                <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-1 text-lg">Dr. Rajesh Kumar</h3>
                  <p className="text-slate-700 text-sm mb-2 font-semibold">Chief Placement Officer</p>
                  <p className="text-slate-600 text-sm">15+ years of experience in career development and industry partnerships</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-slate-900/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-slate-700/10 rounded-full blur-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
