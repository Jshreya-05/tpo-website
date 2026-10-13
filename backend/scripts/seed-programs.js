/**
 * Insert existing hardcoded programs into MongoDB without deleting records.
 * Assigns a department only when it can be inferred with confidence.
 *
 * Usage (from backend/):
 *   npm run seed:programs
 */
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Program from '../models/Program.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SEED_PROGRAMS = [
  {
    slug: 'fullstack',
    title: 'Full Stack Development Workshop',
    url: 'https://www.udemy.com/course/full-stack-web-development-using-the-mern-stack-and-devops/?utm_campaign=BG-Search_DSA_Beta_Prof_la.EN_cc.India&utm_source=bing&utm_medium=paid-search&portfolio=Bing-India&utm_audience=mx&utm_tactic=nb&utm_term=_._ag_1327112923136029_._ad__._kw_IT+en&utm_content=o&funnel=&test=&utm_campaign_id=638596187&msclkid=e8d687365d5c107e4c34ed1157fe13f6&couponCode=PMNVD2025',
    shortDesc: 'Master end-to-end web development with React, Node.js, and MongoDB in this intensive workshop.',
    tag: 'Technical',
    tagColor: '#DBEAFE',
    tagTextColor: '#1D4ED8',
    icon: '💻',
    gradient: 'linear-gradient(135deg,#1B4FD8 0%,#0A1628 100%)',
    students: 120,
    duration: '6 Weeks',
    description: 'A comprehensive hands-on workshop covering the entire spectrum of modern web development. Students work on live projects and build a portfolio-worthy application by the end of the program.',
    topics: ['HTML5 / CSS3 / JavaScript ES6+', 'React.js & Next.js', 'Node.js & Express', 'MongoDB & PostgreSQL', 'REST APIs & GraphQL', 'Git & Deployment (AWS/Vercel)', 'Authentication & Security'],
    benefits: [
      'Build 3 real-world projects for your portfolio',
      'Get mentored by working software engineers',
      'Receive a course completion certificate',
      'Interview prep for product & service companies',
      'Lifetime access to resource materials',
    ],
    department: 'computer',
    sortOrder: 1,
  },
  {
    slug: 'communication',
    title: 'Communication Skills Seminar',
    url: 'https://doortraining.co.in/communication-skills-training-program/',
    shortDesc: 'Develop professional communication, group discussion, and personal interview skills.',
    tag: 'Soft Skills',
    tagColor: '#D1FAE5',
    tagTextColor: '#065F46',
    icon: '🗣️',
    gradient: 'linear-gradient(135deg,#16A34A 0%,#0A1628 100%)',
    students: 200,
    duration: '3 Weeks',
    description: 'This intensive seminar focuses on corporate communication, body language, email etiquette, GD & PI preparation. Conducted by corporate trainers with 15+ years of experience.',
    topics: ['Professional Email & Report Writing', 'Group Discussion Techniques', 'Personal Interview Skills', 'Body Language & Personality', 'Presentation Skills', 'Telephonic & Video Interviews'],
    benefits: [
      'Live GD & mock interview sessions with feedback',
      'Improve confidence and reduce interview anxiety',
      'Learn corporate communication etiquette',
      'Certificate from accredited training body',
      'Ongoing support from placement mentors',
    ],
    department: null,
    sortOrder: 2,
  },
  {
    slug: 'datascience',
    title: 'Data Science & AI Bootcamp',
    url: 'https://www.kaeeducation.com/courses/bootcamp-in-data-science-generative-ai/',
    shortDesc: 'Hands-on bootcamp covering Python, Machine Learning, and AI for engineering placements.',
    tag: 'Data & AI',
    tagColor: '#EDE9FE',
    tagTextColor: '#5B21B6',
    icon: '🤖',
    gradient: 'linear-gradient(135deg,#7C3AED 0%,#0A1628 100%)',
    students: 80,
    duration: '8 Weeks',
    description: 'An industry-aligned bootcamp teaching Python programming, data analysis, machine learning algorithms, and basic AI concepts. Designed for students targeting analytics and AI roles.',
    topics: ['Python for Data Science', 'Pandas, NumPy & Matplotlib', 'Machine Learning Algorithms', 'Deep Learning Basics', 'NLP & Computer Vision Intro', 'SQL & Data Wrangling', 'Case Studies & Kaggle Challenges'],
    benefits: [
      'Work on 5+ real datasets and mini projects',
      'Industry mentorship from data scientists',
      'Exposure to tools: Jupyter, TensorFlow, Scikit-learn',
      'Placement assistance for analytics roles',
      'Earn a data analytics certification',
    ],
    department: 'aids',
    sortOrder: 3,
  },
  {
    slug: 'aptitude',
    title: 'Aptitude & Logical Reasoning',
    url: 'https://www.aptimaster.in/',
    shortDesc: 'Structured preparation for quantitative aptitude, logical reasoning, and verbal sections.',
    tag: 'Placement Prep',
    tagColor: '#FEF3C7',
    tagTextColor: '#92400E',
    icon: '🧠',
    gradient: 'linear-gradient(135deg,#C8973A 0%,#7C3E00 100%)',
    students: 350,
    duration: '4 Weeks',
    description: 'Targeted preparation for all aptitude rounds in campus placements. Covers TCS, Infosys, Wipro, Cognizant, and other company-specific patterns with timed tests and strategy workshops.',
    topics: ['Quantitative Aptitude (All Topics)', 'Logical Reasoning', 'Verbal Ability & Reading Comprehension', 'Data Interpretation', 'Company-Specific Test Patterns', 'Speed Math Techniques', 'Weekly Mock Tests'],
    benefits: [
      'Crack written tests of TCS, Infosys, Wipro & more',
      '100+ practice questions per topic',
      'Weekly full-length mock tests with analysis',
      'Personalised weak area improvement plan',
      'Access to previous year campus test papers',
    ],
    department: null,
    sortOrder: 4,
  },
  {
    slug: 'mockinterview',
    title: 'Mock Interview Sessions',
    url: 'https://www.placementpreps.in/mock-interview',
    shortDesc: 'One-on-one mock interviews with HR professionals and industry experts for real-world practice.',
    tag: 'Interview Prep',
    tagColor: '#FFE4E6',
    tagTextColor: '#9F1239',
    icon: '🎯',
    gradient: 'linear-gradient(135deg,#DC2626 0%,#0A1628 100%)',
    students: 300,
    duration: '2 Weeks',
    description: 'Simulated interview experience with HR managers and senior engineers from partnered companies. Each student gets individual feedback and a performance improvement report.',
    topics: ['Technical Interview Preparation', 'HR Round Best Practices', 'Stress Interview Handling', 'Resume Walkthrough Technique', 'STAR Method for Behavioral Qs', 'Coding Interview on Whiteboard', 'Salary Negotiation Basics'],
    benefits: [
      'One-on-one session with industry interviewer',
      'Detailed written feedback after each round',
      'Video recording of your mock interview',
      'Personalised improvement checklist',
      '2 re-attempt mock sessions included',
    ],
    department: null,
    sortOrder: 5,
  },
  {
    slug: 'experttalks',
    title: 'Industry Expert Talks',
    url: 'https://library.grid.gevernova.com/industry-expert-talks',
    shortDesc: 'Monthly talks by CXOs, engineers, and HR heads from top tech and core companies.',
    tag: 'Guest Lectures',
    tagColor: '#CFFAFE',
    tagTextColor: '#164E63',
    icon: '🎤',
    gradient: 'linear-gradient(135deg,#0891B2 0%,#0A1628 100%)',
    students: 500,
    duration: 'Monthly',
    description: 'A flagship initiative bringing industry leaders to campus to share real-world insights, career paths, and hiring expectations. Past speakers include leaders from TCS, Persistent Systems, KPIT, and L&T.',
    topics: ['Career Path Insights from Industry Leaders', 'Future of Tech & Core Engineering', 'Hiring Expectations & Skill Gaps', 'Entrepreneurship & Startup Journeys', 'Q&A with CXOs & Engineers', 'Networking Sessions'],
    benefits: [
      'Direct access to senior industry professionals',
      'Build your professional network early',
      'Understand real hiring benchmarks',
      'Opportunity for live Q&A and mentorship',
      'Certificate of participation issued',
    ],
    department: null,
    sortOrder: 6,
  },
];

async function seedPrograms() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('Missing MONGO_URI (or MONGODB_URI).');
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB (URI not printed).');

  let created = 0;
  let updated = 0;
  let unchanged = 0;

  for (const item of SEED_PROGRAMS) {
    const existing = await Program.findOne({ slug: item.slug });
    if (!existing) {
      await Program.create({ ...item, status: 'published' });
      created += 1;
      console.log(`Created ${item.slug} (department=${item.department || 'unassigned'})`);
      continue;
    }

    const patch = {};
    if (!existing.department && item.department) {
      patch.department = item.department;
    }
    if (!existing.duration && item.duration) patch.duration = item.duration;
    if (!existing.shortDesc && item.shortDesc) patch.shortDesc = item.shortDesc;

    if (Object.keys(patch).length > 0) {
      await Program.updateOne({ _id: existing._id }, { $set: patch });
      updated += 1;
      console.log(`Updated ${item.slug} without replacing existing content`);
    } else {
      unchanged += 1;
    }
  }

  const unassigned = await Program.countDocuments({
    $or: [{ department: null }, { department: { $exists: false } }, { department: '' }],
  });

  console.log(`Done. created=${created} patched=${updated} unchanged=${unchanged} unassigned=${unassigned}`);
  console.log('Assign remaining departments from Admin → Programs. Existing records were not deleted.');
}

seedPrograms()
  .catch((error) => {
    console.error('Program seed failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {});
  });
