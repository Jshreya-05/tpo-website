import type { Program, Testimonial, GalleryItem, TimelineStep, Resource, StatItem, TeamMember, Responsibility, WhyUsPoint } from '../types'

// ─── Contact ───────────────────────────────────────────────────────────────

export const contactInfo = {
  name: 'Prof. Sanjeev V. Patil',
  designation: 'Training and Placement Officer',
  college: 'Karmaveer Bhaurao Patil College of Engineering, Satara',
  address: 'Near RTO Office, Sadar Bazar, Satara 415001',
  phones: ['9561232933', '9986414388'],
  officePhone: '02162-230636',
  emails: ['tpo@kbpcoes.edu.in', 'tposanjeevpatil@gmail.com'],
  website: 'https://www.kbpcoes.edu.in',
  officeHours: 'Monday – Saturday, 9:00 AM – 5:00 PM',
}

// ─── Programs ──────────────────────────────────────────────────────────────

export const programs: Program[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Development Workshop',
    url: 'https://www.udemy.com/course/full-stack-web-development-using-the-mern-stack-and-devops/?utm_campaign=BG-Search_DSA_Beta_Prof_la.EN_cc.India&utm_source=bing&utm_medium=paid-search&portfolio=Bing-India&utm_audience=mx&utm_tactic=nb&utm_term=_._ag_1327112923136029_._ad__._kw_IT+en&utm_content=o&funnel=&test=&utm_campaign_id=638596187&msclkid=e8d687365d5c107e4c34ed1157fe13f6&couponCode=PMNVD2025',
    shortDesc: 'Master end-to-end web development with React, Node.js, and MongoDB in this intensive workshop.',
    tag: 'Technical', tagColor: '#DBEAFE', tagTextColor: '#1D4ED8',
    icon: '💻',
    gradient: 'linear-gradient(135deg,#1B4FD8 0%,#0A1628 100%)',
    students: 120, duration: '6 Weeks',
    description: 'A comprehensive hands-on workshop covering the entire spectrum of modern web development. Students work on live projects and build a portfolio-worthy application by the end of the program.',
    topics: ['HTML5 / CSS3 / JavaScript ES6+', 'React.js & Next.js', 'Node.js & Express', 'MongoDB & PostgreSQL', 'REST APIs & GraphQL', 'Git & Deployment (AWS/Vercel)', 'Authentication & Security'],
    benefits: [
      'Build 3 real-world projects for your portfolio',
      'Get mentored by working software engineers',
      'Receive a course completion certificate',
      'Interview prep for product & service companies',
      'Lifetime access to resource materials',
    ],
  },
  {
    id: 'communication',
    title: 'Communication Skills Seminar',
    url: 'https://doortraining.co.in/communication-skills-training-program/',
    shortDesc: 'Develop professional communication, group discussion, and personal interview skills.',
    tag: 'Soft Skills', tagColor: '#D1FAE5', tagTextColor: '#065F46',
    icon: '🗣️',
    gradient: 'linear-gradient(135deg,#16A34A 0%,#0A1628 100%)',
    students: 200, duration: '3 Weeks',
    description: 'This intensive seminar focuses on corporate communication, body language, email etiquette, GD & PI preparation. Conducted by corporate trainers with 15+ years of experience.',
    topics: ['Professional Email & Report Writing', 'Group Discussion Techniques', 'Personal Interview Skills', 'Body Language & Personality', 'Presentation Skills', 'Telephonic & Video Interviews'],
    benefits: [
      'Live GD & mock interview sessions with feedback',
      'Improve confidence and reduce interview anxiety',
      'Learn corporate communication etiquette',
      'Certificate from accredited training body',
      'Ongoing support from placement mentors',
    ],
  },
  {
    id: 'datascience',
    title: 'Data Science & AI Bootcamp',
    url: 'https://www.kaeeducation.com/courses/bootcamp-in-data-science-generative-ai/',
    shortDesc: 'Hands-on bootcamp covering Python, Machine Learning, and AI for engineering placements.',
    tag: 'Data & AI', tagColor: '#EDE9FE', tagTextColor: '#5B21B6',
    icon: '🤖',
    gradient: 'linear-gradient(135deg,#7C3AED 0%,#0A1628 100%)',
    students: 80, duration: '8 Weeks',
    description: 'An industry-aligned bootcamp teaching Python programming, data analysis, machine learning algorithms, and basic AI concepts. Designed for students targeting analytics and AI roles.',
    topics: ['Python for Data Science', 'Pandas, NumPy & Matplotlib', 'Machine Learning Algorithms', 'Deep Learning Basics', 'NLP & Computer Vision Intro', 'SQL & Data Wrangling', 'Case Studies & Kaggle Challenges'],
    benefits: [
      'Work on 5+ real datasets and mini projects',
      'Industry mentorship from data scientists',
      'Exposure to tools: Jupyter, TensorFlow, Scikit-learn',
      'Placement assistance for analytics roles',
      'Earn a data analytics certification',
    ],
  },
  {
    id: 'aptitude',
    title: 'Aptitude & Logical Reasoning',
    url: 'https://www.aptimaster.in/',
    shortDesc: 'Structured preparation for quantitative aptitude, logical reasoning, and verbal sections.',
    tag: 'Placement Prep', tagColor: '#FEF3C7', tagTextColor: '#92400E',
    icon: '🧠',
    gradient: 'linear-gradient(135deg,#C8973A 0%,#7C3E00 100%)',
    students: 350, duration: '4 Weeks',
    description: 'Targeted preparation for all aptitude rounds in campus placements. Covers TCS, Infosys, Wipro, Cognizant, and other company-specific patterns with timed tests and strategy workshops.',
    topics: ['Quantitative Aptitude (All Topics)', 'Logical Reasoning', 'Verbal Ability & Reading Comprehension', 'Data Interpretation', 'Company-Specific Test Patterns', 'Speed Math Techniques', 'Weekly Mock Tests'],
    benefits: [
      'Crack written tests of TCS, Infosys, Wipro & more',
      '100+ practice questions per topic',
      'Weekly full-length mock tests with analysis',
      'Personalised weak area improvement plan',
      'Access to previous year campus test papers',
    ],
  },
  {
    id: 'mockinterview',
    title: 'Mock Interview Sessions',
    url: 'https://www.placementpreps.in/mock-interview',
    shortDesc: 'One-on-one mock interviews with HR professionals and industry experts for real-world practice.',
    tag: 'Interview Prep', tagColor: '#FFE4E6', tagTextColor: '#9F1239',
    icon: '🎯',
    gradient: 'linear-gradient(135deg,#DC2626 0%,#0A1628 100%)',
    students: 300, duration: '2 Weeks',
    description: 'Simulated interview experience with HR managers and senior engineers from partnered companies. Each student gets individual feedback and a performance improvement report.',
    topics: ['Technical Interview Preparation', 'HR Round Best Practices', 'Stress Interview Handling', 'Resume Walkthrough Technique', 'STAR Method for Behavioral Qs', 'Coding Interview on Whiteboard', 'Salary Negotiation Basics'],
    benefits: [
      'One-on-one session with industry interviewer',
      'Detailed written feedback after each round',
      'Video recording of your mock interview',
      'Personalised improvement checklist',
      '2 re-attempt mock sessions included',
    ],
  },
  {
    id: 'experttalks',
    title: 'Industry Expert Talks',
    url: 'https://library.grid.gevernova.com/industry-expert-talks',
    shortDesc: 'Monthly talks by CXOs, engineers, and HR heads from top tech and core companies.',
    tag: 'Guest Lectures', tagColor: '#CFFAFE', tagTextColor: '#164E63',
    icon: '🎤',
    gradient: 'linear-gradient(135deg,#0891B2 0%,#0A1628 100%)',
    students: 500, duration: 'Monthly',
    description: 'A flagship initiative bringing industry leaders to campus to share real-world insights, career paths, and hiring expectations. Past speakers include leaders from TCS, Persistent Systems, KPIT, and L&T.',
    topics: ['Career Path Insights from Industry Leaders', 'Future of Tech & Core Engineering', 'Hiring Expectations & Skill Gaps', 'Entrepreneurship & Startup Journeys', 'Q&A with CXOs & Engineers', 'Networking Sessions'],
    benefits: [
      'Direct access to senior industry professionals',
      'Build your professional network early',
      'Understand real hiring benchmarks',
      'Opportunity for live Q&A and mentorship',
      'Certificate of participation issued',
    ],
  },
]

// ─── Companies ─────────────────────────────────────────────────────────────

export const companies: string[] = [
  'TCS', 'Infosys', 'Wipro', 'Cognizant', 'Capgemini',
  'HCL Technologies', 'Tech Mahindra', 'Persistent Systems',
  'KPIT Technologies', 'L&T Technology', 'Mphasis', 'Hexaware',
  'LTIMindtree', 'Birlasoft', 'Zensar', 'Accenture', 'IBM', 'Oracle',
]

// ─── Gallery ───────────────────────────────────────────────────────────────

export const galleryItems: GalleryItem[] = [
  { id: 0, caption: 'Campus Placement Drive 2024', icon: '🏢', gradient: 'linear-gradient(135deg,#1B4FD8,#0A1628)' },
  { id: 1, caption: 'Mock Interview Session', icon: '🎯', gradient: 'linear-gradient(135deg,#7C3AED,#1B4FD8)' },
  { id: 2, caption: 'Industry Guest Lecture', icon: '🎤', gradient: 'linear-gradient(135deg,#0891B2,#0A1628)' },
  { id: 3, caption: 'Coding Bootcamp Workshop', icon: '💻', gradient: 'linear-gradient(135deg,#16A34A,#0A1628)' },
  { id: 4, caption: 'Data Science Training Session', icon: '📊', gradient: 'linear-gradient(135deg,#C8973A,#0A1628)' },
  { id: 5, caption: 'Pre-Placement Orientation', icon: '📋', gradient: 'linear-gradient(135deg,#DC2626,#7C3AED)' },
]

// ─── Testimonials ──────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  { name: 'Priya Deshmukh', role: 'Software Engineer', company: 'TCS Digital', batch: 'B.E. CSE 2024', text: "The aptitude training and mock interview sessions at KBP TPO gave me the confidence I needed. Got placed at TCS Digital with a 7.2 LPA package — couldn't have done it without this support.", initials: 'PD', pkg: '7.2 LPA' },
  { name: 'Rohit Jadhav', role: 'Associate Engineer', company: 'Persistent Systems', batch: 'B.E. ENTC 2024', text: 'The Full Stack workshop was transformative. I built a complete MERN app and showed it during my Persistent interview. The TPO team prepped us for every stage of the process.', initials: 'RJ', pkg: '6.5 LPA' },
  { name: 'Sneha Kulkarni', role: 'Data Analyst', company: 'LTIMindtree', batch: 'B.E. IT 2024', text: 'The Data Science bootcamp helped me pivot into analytics. The trainers were experienced, the curriculum matched industry needs, and the placement support was outstanding.', initials: 'SK', pkg: '8.0 LPA' },
  { name: 'Akash Patil', role: 'Systems Engineer', company: 'Infosys', batch: 'B.E. Mech 2023', text: 'Even as a Mechanical engineer, the communication skills seminar and aptitude training helped me crack Infosys. TPO made sure every branch student had a fair chance at placements.', initials: 'AP', pkg: '5.5 LPA' },
  { name: 'Pooja Shinde', role: 'Junior Developer', company: 'Zensar Technologies', batch: 'B.E. CSE 2023', text: "The industry expert talks gave me insights I couldn't get anywhere else. I knew exactly what companies were looking for and prepared accordingly. The TPO support was exceptional.", initials: 'PS', pkg: '6.0 LPA' },
  { name: 'Arjun Mane', role: 'Cloud Trainee', company: 'HCL Technologies', batch: 'B.E. EE 2024', text: 'The mock interviews were incredibly realistic. The feedback helped me fix all my weak areas. I walked into my actual HCL interview with full confidence and got the offer on the spot!', initials: 'AM', pkg: '5.8 LPA' },
]

// ─── Timeline ──────────────────────────────────────────────────────────────

export const timelineSteps: TimelineStep[] = [
  { step: 'Step 01', icon: '📝', title: 'Student Registration', desc: 'Final and pre-final year students register with the TPO office. Submit updated resume, academic records, and fill in the skill assessment form.' },
  { step: 'Step 02', icon: '📚', title: 'Training & Preparation', desc: 'Attend aptitude classes, soft skills seminars, technical workshops, and mock interview sessions organized by the TPO cell.' },
  { step: 'Step 03', icon: '📢', title: 'Company Job Notification', desc: 'Eligible students receive notifications about visiting companies via email, notice board, and the placement portal.' },
  { step: 'Step 04', icon: '✅', title: 'Application & Shortlisting', desc: 'Students apply through the portal. Companies shortlist candidates based on CGPA, skills, and resume screening.' },
  { step: 'Step 05', icon: '💻', title: 'Written / Online Test', desc: 'Aptitude, reasoning, verbal, and technical tests conducted on campus or online. Clearing this round is mandatory for the interview.' },
  { step: 'Step 06', icon: '🤝', title: 'Interview Rounds', desc: 'Technical interviews (1–2 rounds), followed by HR interview. TPO mentors are available for last-minute guidance and support.' },
  { step: 'Step 07', icon: '🎉', title: 'Offer Letter & Joining', desc: 'Selected candidates receive offer letters. TPO assists with documentation, offer acceptance, and joining formalities.' },
]

// ─── Resources ─────────────────────────────────────────────────────────────

export const resources: Resource[] = [
  { icon: '📄', title: 'Aptitude Practice Hub', desc: 'Curated by the TPO Cell for quantitative, logical reasoning, and verbal placement test preparation.', badge: 'Practice Portal', bg: '#DBEAFE', path: 'https://www.indiabix.com/aptitude/questions-and-answers/' },
  { icon: '📋', title: 'Professional Resume Templates', desc: 'TPO-recommended ATS-ready resume formats and profile-writing references for all departments.', badge: 'Template Library', bg: '#D1FAE5', path: 'https://www.canva.com/resumes/templates/' },
  { icon: '🎯', title: 'Technical Interview Question Bank', desc: 'Branch-wise technical interview questions and coding interview preparation references suggested by TPO.', badge: 'Question Repository', bg: '#EDE9FE', path: 'https://www.geeksforgeeks.org/technical-interview-questions/' },
  { icon: '🗣️', title: 'HR Interview Guide', desc: 'Comprehensive HR interview question resources shared by the Training and Placement Officer for final preparation.', badge: 'Interview Guide', bg: '#FEF3C7', path: 'https://www.interviewbit.com/hr-interview-questions/' },
  { icon: '💻', title: 'Coding Preparation Track', desc: 'TPO-curated coding practice sheets and DSA learning path to improve company round performance.', badge: 'Coding Practice', bg: '#FFE4E6', path: 'https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/' },
  { icon: '📅', title: 'TPO Activity Gallery', desc: 'Official gallery of training sessions, workshops, and placement drives conducted under the TPO Cell.', badge: 'Campus Gallery', bg: '#CFFAFE', path: '#gallery' },
]

// ─── Stats ─────────────────────────────────────────────────────────────────

export const stats: StatItem[] = [
  { id: 'placed', icon: '🎓', target: 1200, suffix: '+', prefix: '', label: 'Students Placed' },
  { id: 'highest', icon: '💰', target: 25, suffix: ' LPA', prefix: '₹', label: 'Highest Package' },
  { id: 'companies', icon: '🏢', target: 40, suffix: '+', prefix: '', label: 'Companies Visited' },
  { id: 'rate', icon: '📈', target: 95, suffix: '%', prefix: '', label: 'Placement Rate' },
]

// ─── About Us Content ─────────────────────────────────────────────────────

export const visionMission = [
  {
    id: 'vision',
    title: 'Our Vision',
    desc: 'To build globally competent professionals and achieve excellence in campus placements by fostering a culture of continuous learning and industry-institute interactions.',
    icon: '👁️',
  },
  {
    id: 'mission',
    title: 'Our Mission',
    desc: 'Provide comprehensive training programs to enhance employability skills, build strong industry connections, and offer personalized career guidance to support student professional growth.',
    icon: '🎯',
  },
]

export const responsibilities: Responsibility[] = [
  { id: 'skill', title: 'Skill Development', desc: 'Curating specialized training in soft skills, technical stacks, and aptitude to make students industry-ready.', iconName: 'Cpu' },
  { id: 'intern', title: 'Internship Opportunities', desc: 'Facilitating student-industry interaction through summer and winter internships in top corporate houses.', iconName: 'Briefcase' },
  { id: 'campus', title: 'Campus Recruitment', desc: 'Coordinating with top-tier companies like TCS, Infosys, and Wipro for on-campus and off-campus drives.', iconName: 'Building2' },
  { id: 'resume', title: 'Resume Training', desc: 'Professional workshops on building ATS-friendly, impactful resumes and LinkedIn profiles.', iconName: 'FileText' },
  { id: 'mock', title: 'Mock Interviews', desc: 'Conducting simulated interview rounds with industry experts to build confidence and refine skills.', iconName: 'Users' },
  { id: 'collab', title: 'Industry Collaboration', desc: 'Forging strategic partnerships and MOUs with leading organizations for holistic student growth.', iconName: 'Handshake' },
]

export const team: TeamMember[] = [
  { id: 'tpo', name: 'Prof. Sanjeev V. Patil', role: 'Training and Placement Officer', desc: 'Leading the Training and Placement Cell with strong focus on student career development, industry readiness, and corporate collaborations.' },
  { id: 'faculty', name: 'Prof. Amol Mane', role: 'Faculty Coordinator', desc: 'Bridging the gap between academic curriculum and industrial requirements through student mentoring.' },
  { id: 'student', name: 'Rahul Deshmukh', role: 'Student Coordinator', desc: 'Streamlining communication between students and the cell while organizing local recruitment drives.' },
]

export const whyUsData: WhyUsPoint[] = [
  { id: 'w1', title: 'Industry-ready training', desc: 'Curriculum designed in collaboration with industry experts to match current market demands.', icon: '🎓' },
  { id: 'w2', title: 'Strong recruiter network', desc: 'Access to 40+ top-tier companies and a growing network of corporate partners.', icon: '🏢' },
  { id: 'w3', title: 'Personalized mentorship', desc: 'One-on-one guidance sessions focusing on individual career goals and skill gap analysis.', icon: '👤' },
  { id: 'w4', title: 'Proven placement results', desc: 'A consistent track record of 95%+ placement rates across all engineering departments.', icon: '✅' },
]
