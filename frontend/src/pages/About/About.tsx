import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Briefcase, 
  Building2, 
  FileText, 
  Users, 
  Handshake, 
  Eye, 
  Target, 
  BookOpen, 
  Award, 
  Globe, 
  GraduationCap 
} from 'lucide-react';
import styles from './About.module.css';
import Footer from '../../components/Footer';
import { contactInfo, responsibilities } from '../../data';

const responsibilityIcons: Record<string, any> = {
  skill: Cpu,
  intern: Briefcase,
  campus: Building2,
  resume: FileText,
  mock: Users,
  collab: Handshake,
};

const placementActivities = [
  {
    icon: Building2,
    title: 'Campus Placement Drives',
    desc: 'Organizing on-campus and virtual recruitment drives with leading IT, core, and product companies throughout the academic year.',
  },
  {
    icon: Briefcase,
    title: 'Internship Programs',
    desc: 'Facilitating summer and winter internships with industry partners to provide students with real-world corporate exposure.',
  },
  {
    icon: Users,
    title: 'Pre-Placement Talks',
    desc: 'Conducting company-specific orientation sessions covering job profiles, selection processes, compensation structures, and growth paths.',
  },
  {
    icon: Award,
    title: 'Assessment & Selection Rounds',
    desc: 'Coordinating aptitude tests, technical interviews, group discussions, and HR rounds with structured logistics and student support.',
  },
  {
    icon: Globe,
    title: 'Industry Visits & Seminars',
    desc: 'Arranging factory visits, expert talks, and career seminars to bridge the gap between classroom learning and industry expectations.',
  },
  {
    icon: GraduationCap,
    title: 'Training & Skill Bootcamps',
    desc: 'Running targeted training programs in aptitude, coding, communication, and domain-specific skills to maximize placement readiness.',
  },
];

const initiatives = [
  {
    icon: BookOpen,
    title: 'Aptitude & Technical Preparation',
    desc: 'Structured curriculum addressing quantitative aptitude, logical reasoning, verbal ability, and programming bootcamps (MERN stack, Python, SQL) to crack screening assessments.',
  },
  {
    icon: Users,
    title: 'Soft Skills & Interview Readiness',
    desc: 'Seminars led by professional soft-skills instructors covering corporate etiquette, business communication, group discussions, and dress code guidance.',
  },
  {
    icon: Award,
    title: 'Certifications & Assessment Drives',
    desc: 'Facilitating branch-specific industry certifications and executing regular mock assessment rounds to check student growth and readiness.',
  }
];

const supports = [
  {
    title: 'Mock Interview Panels',
    desc: 'Simulating actual technical and HR interview rounds with senior engineers and alumni, giving student-specific feedbacks to build maximum self-assurance.',
  },
  {
    title: 'Resume Clinic & ATS Check',
    desc: 'ATS-centric resume formatting, cover letter design, and professional LinkedIn optimization sessions to ensure students pass core company review checks.',
  },
  {
    title: 'Career Counseling',
    desc: 'Continuous advisory sessions under the Training and Placement Officer to align student targets with industry roles and academic specializations.',
  }
];

const collaborations = [
  {
    title: 'Recruitment Drives',
    desc: 'Coordinating with top service-level and product-level corporates (TCS, Infosys, Capgemini, Persistent, etc.) for continuous on-campus and virtual hiring.',
  },
  {
    title: 'MOU & Industry Links',
    desc: 'Signing strategic Memorandums of Understanding with regional and national enterprises to enable internship scopes and expert-led curriculum reviews.',
  },
  {
    title: 'Expert Industry Dialogues',
    desc: 'Organizing monthly expert sessions and executive guest talks for students to learn from real-world developers, managers, and directors.',
  }
];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.aboutPage}>
      <div className={styles.bgGlow} />

      {/* Hero Banner Section */}
      <section className={styles.heroSection}>
        <div className="section-inner">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.sectionLabel}>Training &amp; Placement Cell</span>
            <h1 className={styles.mainTitle}>
              Bridging Academics <span className={styles.gold}>with Corporate Excellence</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Developing highly skilled engineering professionals and aligning student career ambitions with industry demands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Message from TPO Section */}
      <section className={styles.messageSection}>
        <div className="section-inner">
          <div className={styles.messageGrid}>
            
            {/* Left Content */}
            <motion.div
              className={styles.messageCard}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Message from the Training &amp; Placement Officer</h2>
              <div className={styles.divider} />
              
              <p className={styles.paragraph}>
                Welcome to the Training and Placement Cell at Karmaveer Bhaurao Patil College of Engineering, Satara.
                Our primary goal is to empower our students to meet the challenges of the modern corporate world by offering 
                continuous industry exposure, skill development training, and excellent campus placement opportunities.
              </p>
              
              <p className={styles.paragraph}>
                Through meticulous planning, regular workshops, industry partnerships, and simulated mock assessments, 
                we ensure our engineering graduates are not just academically sound, but fully prepared to deploy 
                professional skills from day one. We are committed to fostering strong relationships with recruiting partners 
                and building a prosperous bridge between talent and industry success.
              </p>

              <div className={styles.tpoSignature}>
                <h4>{contactInfo.name}</h4>
                <p>M.B.A. (HR) &amp; M.Tech. (DE)</p>
                <p className={styles.goldLabel}>Training &amp; Placement Officer</p>
              </div>

              <motion.a
                href={`mailto:${contactInfo.emails[0]}`}
                className={styles.ctaButton}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Connect With TPO
              </motion.a>
            </motion.div>

            {/* Right Photo */}
            <motion.div
              className={styles.photoWrapper}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className={styles.photoCard}>
                <img
                  src="/sp-logo.png"
                  alt="Prof. Sanjeev V. Patil, Training and Placement Officer"
                  className={styles.tpoImage}
                />
                <div className={styles.photoOverlay}>
                  <h3>{contactInfo.name}</h3>
                  <p>Training &amp; Placement Officer</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className={styles.visionMissionSection}>
        <div className="section-inner">
          <div className={styles.visionMissionGrid}>
            
            <motion.div
              className={styles.vmCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.vmIconWrapper}>
                <Eye size={28} />
              </div>
              <h3>Our Vision</h3>
              <p className={styles.paragraph}>
                To build globally competent engineering professionals and achieve extreme excellence in campus placements 
                by cultivating a high-growth environment of lifelong learning, technical capability, and sustainable 
                industry-institute interactions.
              </p>
            </motion.div>

            <motion.div
              className={styles.vmCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={styles.vmIconWrapper}>
                <Target size={28} />
              </div>
              <h3>Our Mission</h3>
              <p className={styles.paragraph}>
                To engineer and deliver comprehensive placement training programs that enhance employability, construct 
                lasting industry relationships with elite corporate houses, and offer personalized career support to 
                accelerate student professional journeys.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Responsibilities Section */}
      <section className={styles.responsibilitiesSection}>
        <div className="section-inner">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Operations</span>
            <h2 className={styles.sectionHeading}>Core Responsibilities</h2>
            <p className={styles.sectionSubtitle}>
              Key strategic duties undertaken by the TPO Cell to maximize placement scope and corporate readiness.
            </p>
          </div>

          <div className={styles.responsibilitiesGrid}>
            {responsibilities.map((resp, idx) => {
              const IconComponent = responsibilityIcons[resp.id] || Cpu;
              return (
                <motion.div
                  key={resp.id}
                  className={styles.respCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <div className={styles.respIconWrapper}>
                    <IconComponent size={24} />
                  </div>
                  <h4>{resp.title}</h4>
                  <p className={styles.paragraph}>{resp.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placement Activities Section */}
      <section className={styles.activitiesSection}>
        <div className="section-inner">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Engagement</span>
            <h2 className={styles.sectionHeading}>Placement Activities</h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive placement operations conducted by the TPO Cell to connect students with career opportunities.
            </p>
          </div>

          <div className={styles.activitiesGrid}>
            {placementActivities.map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.title}
                  className={`${styles.activityCard} premium-card`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  data-tilt
                >
                  <div className={styles.activityIcon}>
                    <Icon size={22} />
                  </div>
                  <h4>{activity.title}</h4>
                  <p className={styles.paragraph}>{activity.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Development Initiatives Section */}
      <section className={styles.initiativesSection}>
        <div className="section-inner">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Empowerment</span>
            <h2 className={styles.sectionHeading}>Student Development Initiatives</h2>
            <p className={styles.sectionSubtitle}>
              Structured training frameworks implemented by the TPO cell to foster absolute industry capability.
            </p>
          </div>

          <div className={styles.initiativesGrid}>
            {initiatives.map((init, idx) => {
              const Icon = init.icon;
              return (
                <motion.div
                  key={init.title}
                  className={styles.initCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className={styles.initHeader}>
                    <div className={styles.initIconCircle}>
                      <Icon size={20} />
                    </div>
                    <h4>{init.title}</h4>
                  </div>
                  <p className={styles.paragraph}>{init.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placement Support Section */}
      <section className={styles.supportSection}>
        <div className="section-inner">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Guidance</span>
            <h2 className={styles.sectionHeading}>Placement Support Ecosystem</h2>
            <p className={styles.sectionSubtitle}>
              Continuous assistance and personalized feedback mechanisms supporting students from resume compilation to offer acquisition.
            </p>
          </div>

          <div className={styles.supportGrid}>
            {supports.map((item, idx) => (
              <motion.div
                key={item.title}
                className={styles.supportCard}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.supportAccent} />
                <h4>{item.title}</h4>
                <p className={styles.paragraph}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Collaboration Section */}
      <section className={styles.collabSection}>
        <div className="section-inner">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Synergy</span>
            <h2 className={styles.sectionHeading}>Industry Collaboration</h2>
            <p className={styles.sectionSubtitle}>
              Fostering corporate connections and academic-industry synergy for internships and job placements.
            </p>
          </div>

          <div className={styles.collabGrid}>
            {collaborations.map((collab, idx) => (
              <motion.div
                key={collab.title}
                className={styles.collabCard}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={styles.collabHeader}>
                  <div className={styles.collabDot} />
                  <h4>{collab.title}</h4>
                </div>
                <p className={styles.paragraph}>{collab.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
