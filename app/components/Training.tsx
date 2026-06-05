import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Calendar, Users, Clock } from 'lucide-react';

export function Training() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const activities = [
    {
      image: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHN0dWRlbnQlMjB3b3Jrc2hvcCUyMGNvbXB1dGVyfGVufDF8fHx8MTc3MTQ4NzkxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Full Stack Development Workshop',
      category: 'Technical Training',
      participants: '120 Students',
      duration: '3 Days',
    },
    {
      image: 'https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNlbWluYXIlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzcxMzk5MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Communication Skills Seminar',
      category: 'Soft Skills',
      participants: '200 Students',
      duration: '1 Day',
    },
    {
      image: 'https://images.unsplash.com/photo-1763568258445-70fecf4e78af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBib290Y2FtcCUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MTQxMzQxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Data Science & AI Bootcamp',
      category: 'Technical Training',
      participants: '85 Students',
      duration: '5 Days',
    },
    {
      image: 'https://images.unsplash.com/photo-1580893196685-f061a838ba99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljYWwlMjB3b3Jrc2hvcCUyMGVuZ2luZWVyaW5nfGVufDF8fHx8MTc3MTQ4NzkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Aptitude & Logical Reasoning',
      category: 'Placement Prep',
      participants: '250 Students',
      duration: '2 Weeks',
    },
    {
      image: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHN0dWRlbnQlMjB3b3Jrc2hvcCUyMGNvbXB1dGVyfGVufDF8fHx8MTc3MTQ4NzkxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Mock Interview Sessions',
      category: 'Interview Prep',
      participants: '180 Students',
      duration: 'Ongoing',
    },
    {
      image: 'https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNlbWluYXIlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzcxMzk5MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Industry Expert Talk Series',
      category: 'Guest Lectures',
      participants: '300 Students',
      duration: 'Monthly',
    },
  ];

  return (
    <section id="training" ref={ref} className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-60 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-slate-700 font-bold text-sm sm:text-base inline-block mb-3 tracking-wider">
            TRAINING & WORKSHOPS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Skill Enhancement Programs
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Comprehensive training programs designed to prepare students for industry challenges
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-200"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg">
                    {activity.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors text-lg">
                  {activity.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users size={16} className="text-slate-700" />
                    <span>{activity.participants}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={16} className="text-slate-700" />
                    <span>{activity.duration}</span>
                  </div>
                </div>

                {/* Hover button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity font-semibold shadow-md hover:bg-slate-800"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
