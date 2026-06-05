import { motion, useInView } from 'motion/react';
import { useRef, useEffect } from 'react';
import Slider from 'react-slick';

export function Recruiters() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Mock company logos - in production, these would be actual company logos
  const companies = [
    { name: 'Google', color: '#1e293b' },
    { name: 'Microsoft', color: '#334155' },
    { name: 'Amazon', color: '#475569' },
    { name: 'IBM', color: '#1e293b' },
    { name: 'TCS', color: '#0f172a' },
    { name: 'Infosys', color: '#334155' },
    { name: 'Wipro', color: '#475569' },
    { name: 'Accenture', color: '#1e293b' },
    { name: 'Cognizant', color: '#0f172a' },
    { name: 'Oracle', color: '#334155' },
    { name: 'SAP', color: '#475569' },
    { name: 'Adobe', color: '#1e293b' },
    { name: 'Intel', color: '#0f172a' },
    { name: 'Cisco', color: '#334155' },
    { name: 'Deloitte', color: '#475569' },
    { name: 'Capgemini', color: '#1e293b' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section id="recruiters" ref={ref} className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-slate-700 font-bold text-sm sm:text-base inline-block mb-3 tracking-wider">
            OUR RECRUITERS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Our students are recruited by top companies across various industries worldwide
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200">
            <Slider {...settings}>
              {companies.map((company, index) => (
                <div key={index} className="px-3">
                  <motion.div
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="bg-white rounded-2xl p-6 h-24 flex items-center justify-center shadow-lg hover:shadow-xl transition-all border border-slate-200"
                  >
                    <div className="text-center">
                      <div 
                        className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-md"
                        style={{ backgroundColor: company.color }}
                      >
                        <span className="text-white font-bold text-lg">
                          {company.name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm">{company.name}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.div>

        {/* Stats Below Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12"
        >
          {[
            { label: 'MNCs', value: '150+' },
            { label: 'Startups', value: '75+' },
            { label: 'Core Companies', value: '50+' },
            { label: 'Dream Offers', value: '200+' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-200"
            >
              <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
