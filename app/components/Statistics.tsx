import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Building2, Award } from 'lucide-react';

export function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const barData = [
    { year: '2020', placed: 180, offers: 220 },
    { year: '2021', placed: 215, offers: 270 },
    { year: '2022', placed: 240, offers: 310 },
    { year: '2023', placed: 280, offers: 360 },
    { year: '2024', placed: 320, offers: 420 },
  ];

  const pieData = [
    { name: 'IT & Software', value: 45 },
    { name: 'Core Engineering', value: 25 },
    { name: 'Management', value: 15 },
    { name: 'Analytics', value: 15 },
  ];

  const COLORS = ['#0f172a', '#1e293b', '#475569', '#64748b'];

  const stats = [
    { icon: Users, label: 'Students Placed', value: 1250, suffix: '+', color: 'slate' },
    { icon: Building2, label: 'Recruiting Companies', value: 250, suffix: '+', color: 'slate' },
    { icon: TrendingUp, label: 'Average Package', value: 6.5, suffix: ' LPA', color: 'slate' },
    { icon: Award, label: 'Placement Rate', value: 95, suffix: '%', color: 'slate' },
  ];

  return (
    <section id="statistics" ref={ref} className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-300/30 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-slate-700 font-bold text-sm sm:text-base inline-block mb-3 tracking-wider">
            PLACEMENT STATISTICS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Our Success in Numbers
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Track record of excellence in placements and student success
          </p>
        </motion.div>

        {/* Animated Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <AnimatedStatCard key={index} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Placement Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="placed" fill="#0f172a" radius={[8, 8, 0, 0]} />
                <Bar dataKey="offers" fill="#475569" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-900"></div>
                <span className="text-sm text-slate-600">Students Placed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                <span className="text-sm text-slate-600">Offers Received</span>
              </div>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Placement by Sector</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnimatedStatCard({ stat, index, isInView }: any) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-200 text-center hover:shadow-2xl transition-all"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <stat.icon className="text-white" size={24} />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
        {count.toFixed(stat.suffix === ' LPA' ? 1 : 0)}{stat.suffix}
      </div>
      <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
    </motion.div>
  );
}
