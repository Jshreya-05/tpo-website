/**
 * Safely add the approved department training-program catalogue to MongoDB.
 * Existing programs are never replaced or deleted.
 *
 * Usage (from backend/):
 *   npm run seed:programs
 */
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Program from '../models/Program.js';
import { PROGRAM_DEPARTMENTS } from '../constants/departments.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const departmentStyles = {
  mechanical: {
    tagColor: '#DBEAFE',
    tagTextColor: '#1D4ED8',
    gradient: 'linear-gradient(135deg,#1B4FD8 0%,#0A1628 100%)',
  },
  civil: {
    tagColor: '#FEF3C7',
    tagTextColor: '#92400E',
    gradient: 'linear-gradient(135deg,#C8973A 0%,#0A1628 100%)',
  },
  electrical: {
    tagColor: '#FEE2E2',
    tagTextColor: '#991B1B',
    gradient: 'linear-gradient(135deg,#DC2626 0%,#0A1628 100%)',
  },
  entc: {
    tagColor: '#CFFAFE',
    tagTextColor: '#155E75',
    gradient: 'linear-gradient(135deg,#0891B2 0%,#0A1628 100%)',
  },
  computer: {
    tagColor: '#D1FAE5',
    tagTextColor: '#065F46',
    gradient: 'linear-gradient(135deg,#16A34A 0%,#0A1628 100%)',
  },
  aids: {
    tagColor: '#EDE9FE',
    tagTextColor: '#5B21B6',
    gradient: 'linear-gradient(135deg,#7C3AED 0%,#0A1628 100%)',
  },
};

const freeResourceLinks = {
  'mechanical-autocad-mechanical-drafting': 'https://www.autodesk.com/learn/ondemand/collection/autocad',
  'mechanical-solidworks-3d-cad-modelling': 'https://www.youtube.com/results?search_query=free+SOLIDWORKS+3D+CAD+beginner+tutorial',
  'mechanical-catia-product-design-fundamentals': 'https://www.youtube.com/results?search_query=free+CATIA+product+design+beginner+tutorial',
  'mechanical-cnc-programming-manufacturing-technology': 'https://www.haascnc.com/haas-education/online-learning.html',
  'mechanical-industrial-automation-robotics': 'https://www.youtube.com/results?search_query=free+industrial+automation+robotics+fundamentals+course',
  'civil-autocad-civil-engineering': 'https://www.autodesk.com/learn/ondemand/collection/autocad',
  'civil-revit-building-information-modelling': 'https://www.autodesk.com/learn/ondemand/collection/revit',
  'civil-staad-pro-structural-analysis': 'https://www.youtube.com/results?search_query=free+STAAD.Pro+structural+analysis+tutorial',
  'civil-quantity-estimation-costing': 'https://www.youtube.com/results?search_query=free+civil+quantity+estimation+costing+course',
  'civil-surveying-total-station-fundamentals': 'https://www.youtube.com/results?search_query=free+total+station+surveying+fundamentals+tutorial',
  'electrical-plc-scada-industrial-automation': 'https://www.siemens.com/global/en/products/automation/topic-areas/sce.html',
  'electrical-cad-panel-design': 'https://qelectrotech.org/',
  'electrical-matlab-simulink-electrical-systems': 'https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted',
  'electrical-solar-renewable-power-systems': 'https://www.pveducation.org/',
  'electrical-power-electronics-electric-vehicle-fundamentals': 'https://afdc.energy.gov/vehicles/electric_basics.html',
  'entc-embedded-systems-arduino-esp32': 'https://docs.arduino.cc/learn/',
  'entc-vlsi-design-verilog-hdl': 'https://hdlbits.01xz.net/wiki/Main_Page',
  'entc-pcb-design-circuit-prototyping': 'https://docs.kicad.org/10.0/en/getting_started_in_kicad/getting_started_in_kicad.html',
  'entc-internet-of-things-iot-development': 'https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/index.html',
  'entc-digital-electronics-fpga-fundamentals': 'https://nandland.com/learn-verilog/',
  fullstack: 'https://www.theodinproject.com/paths/full-stack-javascript',
  'computer-java-programming-data-structures-algorithms': 'https://java-programming.mooc.fi/',
  'computer-python-programming-software-development': 'https://docs.python.org/3/tutorial/',
  'computer-cloud-computing-devops-fundamentals': 'https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/',
  'computer-cybersecurity-network-security-fundamentals': 'https://www.netacad.com/courses/introduction-to-cybersecurity',
  'aids-machine-learning-python': 'https://www.kaggle.com/learn/intro-to-machine-learning',
  'aids-generative-ai-large-language-models': 'https://huggingface.co/learn/llm-course/chapter1/1',
  'aids-data-analytics-sql-pandas-power-bi': 'https://www.kaggle.com/learn',
  'aids-deep-learning-computer-vision': 'https://course.fast.ai/',
  'aids-natural-language-processing': 'https://huggingface.co/learn/llm-course/chapter1/1',
};

function makeProgram(program) {
  const style = departmentStyles[program.department];
  return {
    ...program,
    tagColor: style.tagColor,
    tagTextColor: style.tagTextColor,
    gradient: style.gradient,
    students: 0,
    url: freeResourceLinks[program.slug],
    status: 'published',
  };
}

export const SEED_PROGRAMS = [
  makeProgram({
    slug: 'mechanical-autocad-mechanical-drafting',
    title: 'AutoCAD and Mechanical Drafting',
    department: 'mechanical',
    tag: 'CAD & Drafting',
    icon: '📐',
    sortOrder: 1,
    duration: 'Proposed: 4 weeks',
    shortDesc: 'Build foundational 2D drafting skills for mechanical components and engineering drawings.',
    description: 'A proposed practical course introducing computer-aided mechanical drafting. Learners practice creating, editing, annotating, and organizing engineering drawings using common drafting conventions.',
    topics: ['AutoCAD workspace and drawing setup', 'Geometric construction and precision tools', 'Layers, linetypes, and dimension styles', 'Orthographic and isometric views', 'Mechanical drawing conventions', 'Plotting and drawing-sheet standards'],
    benefits: ['Practice producing clear engineering drawings', 'Develop precision and CAD workflow skills', 'Prepare sample drawings for a technical portfolio'],
  }),
  makeProgram({
    slug: 'mechanical-solidworks-3d-cad-modelling',
    title: 'SolidWorks and 3D CAD Modelling',
    department: 'mechanical',
    tag: '3D CAD',
    icon: '🧩',
    sortOrder: 2,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Learn parametric part modelling, assemblies, and engineering drawings in 3D CAD.',
    description: 'A proposed introduction to parametric 3D design using SolidWorks concepts. Learners build parts from sketches, combine them into assemblies, and create drawings that communicate design intent.',
    topics: ['Sketch constraints and dimensions', 'Extrude, revolve, and feature operations', 'Parametric part modelling', 'Assembly mates and interference checks', 'Engineering drawings and annotations', 'Design revisions and file organization'],
    benefits: ['Gain hands-on experience with a 3D CAD workflow', 'Understand how parts and assemblies relate', 'Create model and drawing samples for a portfolio'],
  }),
  makeProgram({
    slug: 'mechanical-catia-product-design-fundamentals',
    title: 'CATIA and Product Design Fundamentals',
    department: 'mechanical',
    tag: 'Product Design',
    icon: '🛠️',
    sortOrder: 3,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Explore CATIA part design, surface modelling, and product-development workflows.',
    description: 'A proposed foundational course in CATIA-based product design. Exercises introduce part and surface modelling, design intent, and the steps used to communicate a concept for engineering review.',
    topics: ['CATIA interface and workbenches', 'Sketcher and Part Design features', 'Assembly Design fundamentals', 'Surface modelling concepts', 'Design intent and feature trees', 'Product drawings and review'],
    benefits: ['Develop familiarity with product-design workflows', 'Practice translating a concept into a 3D model', 'Build a structured modelling exercise for a portfolio'],
  }),
  makeProgram({
    slug: 'mechanical-cnc-programming-manufacturing-technology',
    title: 'CNC Programming and Manufacturing Technology',
    department: 'mechanical',
    tag: 'Manufacturing',
    icon: '⚙️',
    sortOrder: 4,
    duration: 'Proposed: 4 weeks',
    shortDesc: 'Understand CNC machining concepts, tool paths, and introductory G-code programming.',
    description: 'A proposed introduction to computer numerical control and modern manufacturing. Learners connect machining operations and tooling choices with basic program structure and safe process planning.',
    topics: ['CNC machine axes and coordinate systems', 'Workholding and cutting-tool basics', 'G-code and M-code structure', 'Turning and milling operations', 'Tool-path planning and simulation', 'Manufacturing safety and process documentation'],
    benefits: ['Connect manufacturing concepts with CNC program logic', 'Practice interpreting introductory machining programs', 'Strengthen process-planning and technical vocabulary'],
  }),
  makeProgram({
    slug: 'mechanical-industrial-automation-robotics',
    title: 'Industrial Automation and Robotics',
    department: 'mechanical',
    tag: 'Automation',
    icon: '🤖',
    sortOrder: 5,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Study industrial automation building blocks, sensors, actuators, and robot applications.',
    description: 'A proposed overview of automation used in manufacturing environments. Activities introduce sensing, actuation, robot motion, and the safety and integration considerations behind automated cells.',
    topics: ['Automation system components', 'Industrial sensors and actuators', 'Robot coordinate frames and motion', 'Pneumatic and hydraulic control basics', 'Automated-cell sequencing', 'Industrial safety and integration'],
    benefits: ['Understand how automation components work together', 'Practice mapping a simple automated process', 'Build cross-disciplinary manufacturing knowledge'],
  }),

  makeProgram({
    slug: 'civil-autocad-civil-engineering',
    title: 'AutoCAD for Civil Engineering',
    department: 'civil',
    tag: 'CAD & Drafting',
    icon: '📏',
    sortOrder: 1,
    duration: 'Proposed: 4 weeks',
    shortDesc: 'Create and annotate civil engineering plans with accurate CAD drafting practices.',
    description: 'A proposed civil-focused drafting course covering drawing setup, layers, dimensions, and plan presentation. Exercises use representative site and building-plan examples for learning purposes.',
    topics: ['Drawing setup, units, and coordinate entry', 'Layers and drafting standards', 'Site plans and building layouts', 'Dimensions, annotations, and symbols', 'Layouts, viewports, and plotting', 'Drawing review and file exchange'],
    benefits: ['Practice preparing readable civil drawings', 'Develop consistent CAD organization habits', 'Create sample plans for a technical portfolio'],
  }),
  makeProgram({
    slug: 'civil-revit-building-information-modelling',
    title: 'Revit and Building Information Modelling (BIM)',
    department: 'civil',
    tag: 'BIM',
    icon: '🏢',
    sortOrder: 2,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Learn BIM fundamentals by developing coordinated building models and documentation.',
    description: 'A proposed introduction to building information modelling with Revit. Learners create a small building model and explore how views, schedules, and coordinated documentation are derived from shared model data.',
    topics: ['BIM concepts and Revit project setup', 'Levels, grids, and building elements', 'Plans, sections, and elevations', 'Families and model properties', 'Schedules and quantity information', 'Model coordination and documentation'],
    benefits: ['Understand model-based building documentation', 'Practice producing coordinated project views', 'Develop a small BIM model for portfolio discussion'],
  }),
  makeProgram({
    slug: 'civil-staad-pro-structural-analysis',
    title: 'STAAD.Pro and Structural Analysis',
    department: 'civil',
    tag: 'Structural Analysis',
    icon: '🏗️',
    sortOrder: 3,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Explore structural modelling, loads, analysis results, and design-check concepts.',
    description: 'A proposed introductory course connecting structural-analysis principles with STAAD.Pro workflows. Learners create simple analytical models and interpret results under guided, educational examples.',
    topics: ['Structural idealization and model geometry', 'Support conditions and member properties', 'Load cases and combinations', 'Analysis runs and result interpretation', 'Basic code-check concepts', 'Model verification and reporting'],
    benefits: ['Connect analysis theory with software workflows', 'Practice reviewing model assumptions and results', 'Improve structural-engineering technical communication'],
  }),
  makeProgram({
    slug: 'civil-quantity-estimation-costing',
    title: 'Quantity Estimation and Costing',
    department: 'civil',
    tag: 'Estimation',
    icon: '🧮',
    sortOrder: 4,
    duration: 'Proposed: 4 weeks',
    shortDesc: 'Practice quantity take-offs and introductory cost estimates from civil drawings.',
    description: 'A proposed course in measurement and estimating fundamentals. Learners extract quantities from sample drawings, organize calculations, and understand how assumptions and rates affect a preliminary estimate.',
    topics: ['Drawing interpretation and measurement units', 'Quantity take-off methods', 'Earthwork and concrete quantities', 'Masonry and finishing quantities', 'Rate analysis fundamentals', 'Estimate sheets and checking procedures'],
    benefits: ['Develop structured measurement and calculation habits', 'Practice preparing transparent estimate sheets', 'Understand assumptions in preliminary costing'],
  }),
  makeProgram({
    slug: 'civil-surveying-total-station-fundamentals',
    title: 'Surveying and Total Station Fundamentals',
    department: 'civil',
    tag: 'Surveying',
    icon: '🧭',
    sortOrder: 5,
    duration: 'Proposed: 4 weeks',
    shortDesc: 'Study surveying principles, field observations, and introductory total-station workflows.',
    description: 'A proposed fundamentals course covering surveying measurements and electronic data collection. Demonstrations and exercises focus on setup, observation, recording, and checking representative field data.',
    topics: ['Surveying measurements and errors', 'Traversing and coordinate fundamentals', 'Total-station setup and orientation', 'Angle and distance observations', 'Field-book and data management', 'Basic setting-out and quality checks'],
    benefits: ['Understand common surveying field workflows', 'Practice careful observation and record keeping', 'Build confidence interpreting survey data'],
  }),

  makeProgram({
    slug: 'electrical-plc-scada-industrial-automation',
    title: 'PLC and SCADA Industrial Automation',
    department: 'electrical',
    tag: 'Industrial Automation',
    icon: '🔌',
    sortOrder: 1,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Learn PLC logic, industrial input/output concepts, and SCADA monitoring basics.',
    description: 'A proposed introduction to industrial control systems. Learners develop simple PLC logic, connect it to representative input/output devices, and explore supervisory monitoring and alarm concepts.',
    topics: ['PLC architecture and scan cycle', 'Ladder-logic contacts, coils, and timers', 'Digital and analog input/output', 'Interlocks and sequence control', 'SCADA tags, trends, and alarms', 'Control-system safety fundamentals'],
    benefits: ['Practice translating process requirements into control logic', 'Understand PLC-to-SCADA relationships', 'Develop troubleshooting and system-documentation skills'],
  }),
  makeProgram({
    slug: 'electrical-cad-panel-design',
    title: 'Electrical CAD and Panel Design',
    department: 'electrical',
    tag: 'Electrical Design',
    icon: '🗂️',
    sortOrder: 2,
    duration: 'Proposed: 4 weeks',
    shortDesc: 'Prepare organized electrical schematics and introductory control-panel layouts.',
    description: 'A proposed drafting course focused on electrical documentation and panel-design concepts. Learners develop schematic sheets and layouts while considering component identification, wiring, and safe review practices.',
    topics: ['Electrical CAD project setup', 'Schematic symbols and references', 'Control and power-circuit drawings', 'Panel layout and component selection', 'Wire numbering and bill of materials', 'Drawing checks and revision control'],
    benefits: ['Practice producing clear electrical documentation', 'Understand schematic-to-panel relationships', 'Build a sample drawing set for a technical portfolio'],
  }),
  makeProgram({
    slug: 'electrical-matlab-simulink-electrical-systems',
    title: 'MATLAB and Simulink for Electrical Systems',
    department: 'electrical',
    tag: 'Modelling & Simulation',
    icon: '📈',
    sortOrder: 3,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Model, simulate, and interpret introductory electrical-system behaviour.',
    description: 'A proposed computational course using MATLAB and Simulink for electrical engineering examples. Learners implement equations, build block diagrams, and interpret time-domain responses under defined assumptions.',
    topics: ['MATLAB scripts, arrays, and plotting', 'Electrical-system equations', 'Simulink blocks and model setup', 'Transient and steady-state response', 'Parameter sweeps and result analysis', 'Model validation and technical reporting'],
    benefits: ['Connect mathematical models with simulation results', 'Practice computational problem solving', 'Create reproducible simulation exercises'],
  }),
  makeProgram({
    slug: 'electrical-solar-renewable-power-systems',
    title: 'Solar Energy and Renewable Power Systems',
    department: 'electrical',
    tag: 'Renewable Energy',
    icon: '☀️',
    sortOrder: 4,
    duration: 'Proposed: 4 weeks',
    shortDesc: 'Understand photovoltaic systems, power conversion, and renewable integration basics.',
    description: 'A proposed overview of solar-electric systems and renewable power integration. Learners examine energy conversion, system components, basic sizing considerations, and safe operating principles.',
    topics: ['Solar resource and photovoltaic-cell basics', 'PV modules and array configurations', 'Inverters and power conversion', 'Battery storage and system balance', 'Grid-connected and standalone systems', 'Monitoring, safety, and maintenance concepts'],
    benefits: ['Understand the main components in a PV system', 'Practice introductory energy and sizing calculations', 'Build awareness of renewable integration challenges'],
  }),
  makeProgram({
    slug: 'electrical-power-electronics-electric-vehicle-fundamentals',
    title: 'Power Electronics and Electric Vehicle Fundamentals',
    department: 'electrical',
    tag: 'Power Electronics & EV',
    icon: '🔋',
    sortOrder: 5,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Explore converter circuits, motor drives, and electric-vehicle powertrain components.',
    description: 'A proposed fundamentals course linking power-electronic converters with electric-vehicle systems. Learners study representative circuits and system blocks without assuming access to a specific vehicle platform.',
    topics: ['Power semiconductor devices', 'AC-DC and DC-DC converter principles', 'Inverters and motor-drive concepts', 'EV battery and battery-management basics', 'Charging-system architecture', 'Efficiency, protection, and safety'],
    benefits: ['Understand core EV electrical subsystems', 'Connect converter theory to traction applications', 'Develop technical vocabulary for emerging power systems'],
  }),

  makeProgram({
    slug: 'entc-embedded-systems-arduino-esp32',
    title: 'Embedded Systems with Arduino and ESP32',
    department: 'entc',
    tag: 'Embedded Systems',
    icon: '🧰',
    sortOrder: 1,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Build microcontroller projects using sensors, interfaces, and wireless features.',
    description: 'A proposed hands-on introduction to embedded-system development using Arduino- and ESP32-class boards. Learners connect peripherals, write firmware, and test small sensing and control applications.',
    topics: ['Microcontroller architecture and development setup', 'Digital and analog input/output', 'Sensor and actuator interfacing', 'Serial communication and debugging', 'ESP32 wireless connectivity basics', 'Firmware testing and power considerations'],
    benefits: ['Practice connecting software with physical devices', 'Develop debugging and prototyping skills', 'Create a small demonstrable embedded project'],
  }),
  makeProgram({
    slug: 'entc-vlsi-design-verilog-hdl',
    title: 'VLSI Design and Verilog HDL',
    department: 'entc',
    tag: 'Digital Design',
    icon: '🧠',
    sortOrder: 2,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Learn digital hardware description and introductory VLSI design workflows.',
    description: 'A proposed digital-design course using Verilog HDL to describe and simulate hardware blocks. Learners progress from combinational logic to sequential designs and discuss the stages of a VLSI flow.',
    topics: ['RTL design concepts and Verilog syntax', 'Combinational logic modelling', 'Sequential logic and state machines', 'Testbenches and simulation', 'Synthesis and timing concepts', 'VLSI design-flow overview'],
    benefits: ['Translate digital logic into hardware descriptions', 'Practice simulation-based verification', 'Understand the stages of an introductory VLSI workflow'],
  }),
  makeProgram({
    slug: 'entc-pcb-design-circuit-prototyping',
    title: 'PCB Design and Circuit Prototyping',
    department: 'entc',
    tag: 'PCB Design',
    icon: '🟩',
    sortOrder: 3,
    duration: 'Proposed: 4 weeks',
    shortDesc: 'Take a schematic through component placement, routing, and prototype review.',
    description: 'A proposed practical course in printed-circuit-board design and prototyping. Learners move from a simple schematic to a manufacturable layout and review electrical, mechanical, and assembly considerations.',
    topics: ['Schematic capture and component libraries', 'Footprints and board constraints', 'Placement and routing fundamentals', 'Grounding and signal-integrity basics', 'Design-rule checks and fabrication outputs', 'Prototype assembly and testing'],
    benefits: ['Practice an end-to-end PCB design workflow', 'Learn to identify common layout issues', 'Prepare fabrication files for a sample circuit'],
  }),
  makeProgram({
    slug: 'entc-internet-of-things-iot-development',
    title: 'Internet of Things (IoT) Development',
    department: 'entc',
    tag: 'IoT',
    icon: '📡',
    sortOrder: 4,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Connect embedded devices to services and build a basic data-monitoring workflow.',
    description: 'A proposed introduction to IoT system design, from device sensing to data visualization. Exercises use representative protocols and cloud-service concepts without requiring a specific commercial platform.',
    topics: ['IoT architecture and device identity', 'Sensor data acquisition', 'MQTT and HTTP communication concepts', 'Gateway and network fundamentals', 'Data storage and dashboard concepts', 'Security, privacy, and reliability basics'],
    benefits: ['Understand device-to-service communication', 'Practice designing a simple telemetry workflow', 'Recognize foundational IoT security considerations'],
  }),
  makeProgram({
    slug: 'entc-digital-electronics-fpga-fundamentals',
    title: 'Digital Electronics and FPGA Fundamentals',
    department: 'entc',
    tag: 'FPGA & Digital Logic',
    icon: '🔣',
    sortOrder: 5,
    duration: 'Proposed: 4 weeks',
    shortDesc: 'Apply digital-logic concepts to introductory FPGA design and verification.',
    description: 'A proposed course connecting digital-electronics theory with FPGA-based prototyping. Learners describe small logic circuits, simulate expected behaviour, and understand how a design maps to programmable logic.',
    topics: ['Number systems and Boolean algebra', 'Combinational and sequential circuits', 'HDL design and simulation basics', 'FPGA architecture and I/O constraints', 'Synthesis, implementation, and timing', 'Board-level testing and verification'],
    benefits: ['Strengthen practical digital-logic understanding', 'Practice describing and verifying small circuits', 'Explore a hardware prototyping workflow'],
  }),

  makeProgram({
    slug: 'fullstack',
    title: 'Full-Stack Web Development',
    department: 'computer',
    tag: 'Web Development',
    icon: '💻',
    sortOrder: 1,
    duration: 'Proposed: 6 weeks',
    shortDesc: 'Develop a full-stack web application using modern frontend, API, and database concepts.',
    description: 'A proposed hands-on course covering the building blocks of a modern full-stack application. Learners work through a guided project from interface design to API integration, persistence, version control, and deployment concepts.',
    topics: ['HTML, CSS, and responsive layout', 'JavaScript and TypeScript fundamentals', 'React.js and Next.js', 'Node.js and Express', 'MongoDB and relational database concepts', 'REST APIs and GraphQL fundamentals', 'Authentication and web security basics', 'Git workflows, testing, and deployment'],
    benefits: ['Build practical experience through a guided project', 'Develop frontend and backend integration skills', 'Create a project suitable for a student portfolio'],
  }),
  makeProgram({
    slug: 'computer-java-programming-data-structures-algorithms',
    title: 'Java Programming and Data Structures & Algorithms',
    department: 'computer',
    tag: 'Programming & DSA',
    icon: '☕',
    sortOrder: 2,
    duration: 'Proposed: 6 weeks',
    shortDesc: 'Strengthen Java programming and problem-solving through core data structures and algorithms.',
    description: 'A proposed course for learners developing programming fluency and algorithmic reasoning. Practice progresses through Java fundamentals, common data structures, complexity analysis, and problem-solving patterns.',
    topics: ['Java syntax, classes, and object-oriented design', 'Collections and generics', 'Arrays, strings, lists, and stacks', 'Trees, hash tables, and graphs', 'Sorting, searching, and recursion', 'Complexity analysis and coding practice'],
    benefits: ['Build confidence writing structured Java programs', 'Improve data-structure selection and algorithmic reasoning', 'Practice explaining solutions and trade-offs'],
  }),
  makeProgram({
    slug: 'computer-python-programming-software-development',
    title: 'Python Programming and Software Development',
    department: 'computer',
    tag: 'Software Development',
    icon: '🐍',
    sortOrder: 3,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Apply Python fundamentals to modular software, testing, and practical automation.',
    description: 'A proposed software-development course using Python. Learners progress from core language concepts to modular design, file and API handling, testing, and small maintainable applications.',
    topics: ['Python syntax, collections, and functions', 'Modules, packages, and virtual environments', 'Object-oriented and modular design', 'Files, JSON, and HTTP APIs', 'Exceptions, logging, and automated tests', 'Git-based development workflow'],
    benefits: ['Practice writing readable and maintainable code', 'Build a small tested software project', 'Develop reusable programming and debugging skills'],
  }),
  makeProgram({
    slug: 'computer-cloud-computing-devops-fundamentals',
    title: 'Cloud Computing and DevOps Fundamentals',
    department: 'computer',
    tag: 'Cloud & DevOps',
    icon: '☁️',
    sortOrder: 4,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Explore cloud architecture, containers, versioned delivery, and CI/CD principles.',
    description: 'A proposed foundation in cloud computing and DevOps practices. Learners study service models, container concepts, automated build pipelines, and operational practices through a sample application workflow.',
    topics: ['Cloud service and deployment models', 'Linux and command-line foundations', 'Containers and image lifecycle', 'Infrastructure and configuration concepts', 'CI/CD pipelines and automated checks', 'Monitoring, reliability, and access basics'],
    benefits: ['Understand the path from code to deployment', 'Practice collaborative, repeatable delivery workflows', 'Develop foundational cloud and operations vocabulary'],
  }),
  makeProgram({
    slug: 'computer-cybersecurity-network-security-fundamentals',
    title: 'Cybersecurity and Network Security Fundamentals',
    department: 'computer',
    tag: 'Cybersecurity',
    icon: '🔐',
    sortOrder: 5,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Learn defensive security principles, network basics, and safe vulnerability awareness.',
    description: 'A proposed introductory course focused on responsible, defensive security practices. Learners examine common security principles, network controls, and risk-reduction methods using authorized lab examples.',
    topics: ['Security principles and threat modelling', 'Networking and protocol fundamentals', 'Identity, access, and authentication', 'Secure software and input handling', 'Vulnerability management and safe lab practice', 'Incident response and security hygiene'],
    benefits: ['Recognize common security risks and mitigations', 'Practice responsible defensive analysis', 'Strengthen secure development and networking fundamentals'],
  }),

  makeProgram({
    slug: 'aids-machine-learning-python',
    title: 'Machine Learning with Python',
    department: 'aids',
    tag: 'Machine Learning',
    icon: '📊',
    sortOrder: 1,
    duration: 'Proposed: 6 weeks',
    shortDesc: 'Build and evaluate introductory machine-learning models with Python.',
    description: 'A proposed applied course covering a practical machine-learning workflow. Learners prepare data, select baseline models, evaluate results, and discuss limitations using carefully scoped educational datasets.',
    topics: ['Python, NumPy, and Pandas foundations', 'Data cleaning and exploratory analysis', 'Regression and classification', 'Feature engineering and model pipelines', 'Validation metrics and cross-validation', 'Model interpretation and responsible use'],
    benefits: ['Practice an end-to-end modelling workflow', 'Learn to evaluate models beyond a single score', 'Build a documented machine-learning project'],
  }),
  makeProgram({
    slug: 'aids-generative-ai-large-language-models',
    title: 'Generative AI and Large Language Models',
    department: 'aids',
    tag: 'Generative AI',
    icon: '✨',
    sortOrder: 2,
    duration: 'Proposed: 4 weeks',
    shortDesc: 'Understand generative-AI concepts, LLM workflows, evaluation, and responsible use.',
    description: 'A proposed educational introduction to generative AI and large language models. Learners explore how language-model applications are assembled and evaluated, including limitations, privacy, and responsible-use considerations.',
    topics: ['Generative-model and transformer concepts', 'Prompt design and structured outputs', 'Retrieval-augmented generation overview', 'Application evaluation and error analysis', 'Data privacy and model limitations', 'Responsible-AI and safety considerations'],
    benefits: ['Understand common LLM application patterns', 'Practice evaluating output quality and limitations', 'Develop responsible and privacy-aware AI habits'],
  }),
  makeProgram({
    slug: 'aids-data-analytics-sql-pandas-power-bi',
    title: 'Data Analytics with SQL, Pandas and Power BI',
    department: 'aids',
    tag: 'Data Analytics',
    icon: '📈',
    sortOrder: 3,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Query, transform, and visualize data to communicate evidence-based insights.',
    description: 'A proposed analytics course connecting relational queries, Python data preparation, and business-intelligence reporting. Learners produce a small, reproducible analysis from a prepared dataset.',
    topics: ['Relational data and SQL queries', 'Joins, grouping, and window functions', 'Pandas cleaning and transformation', 'Exploratory analysis and data quality', 'Power BI models and visualizations', 'Dashboard design and insight communication'],
    benefits: ['Practice working across a common analytics toolchain', 'Build a clear dashboard from a prepared dataset', 'Improve data interpretation and communication skills'],
  }),
  makeProgram({
    slug: 'aids-deep-learning-computer-vision',
    title: 'Deep Learning and Computer Vision',
    department: 'aids',
    tag: 'Deep Learning',
    icon: '👁️',
    sortOrder: 4,
    duration: 'Proposed: 6 weeks',
    shortDesc: 'Explore neural-network foundations and image-based computer-vision workflows.',
    description: 'A proposed applied introduction to deep learning and computer vision. Learners study neural-network components, prepare image data, train a baseline model, and evaluate performance and limitations.',
    topics: ['Neural-network and optimization basics', 'Image data preparation and augmentation', 'Convolutional neural networks', 'Training, validation, and regularization', 'Classification metrics and error analysis', 'Ethics, bias, and deployment considerations'],
    benefits: ['Understand a practical image-model workflow', 'Practice training and evaluating a baseline model', 'Learn to identify dataset and model limitations'],
  }),
  makeProgram({
    slug: 'aids-natural-language-processing',
    title: 'Natural Language Processing (NLP)',
    department: 'aids',
    tag: 'Natural Language Processing',
    icon: '💬',
    sortOrder: 5,
    duration: 'Proposed: 5 weeks',
    shortDesc: 'Process text data and develop introductory language-analysis applications.',
    description: 'A proposed course introducing natural-language processing with Python. Learners prepare text, explore feature representations, and compare baseline approaches for common language tasks.',
    topics: ['Text normalization and tokenization', 'N-grams and vector representations', 'Text classification and evaluation', 'Named-entity and sentiment concepts', 'Embeddings and transformer overview', 'Bias, privacy, and language-data quality'],
    benefits: ['Practice converting text into analyzable data', 'Build and evaluate a baseline NLP project', 'Understand limitations in language datasets and models'],
  }),
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
    status: 'published',
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
    status: 'published',
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
    status: 'published',
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
    status: 'published',
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
    status: 'published',
  },
];

function slugify(value = '') {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

async function seedPrograms() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('Missing MONGO_URI (or MONGODB_URI).');
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB (URI not printed).');

  let created = 0;
  let linksAdded = 0;
  let unchanged = 0;
  const existingPrograms = await Program.find({}, 'slug title department url').lean();
  const existingBySlug = new Map(existingPrograms.map((program) => [program.slug, program]));
  const existingKeys = new Set(
    existingPrograms
      .filter((program) => program.department)
      .map((program) => `${program.department}:${slugify(program.title)}`)
  );

  for (const program of SEED_PROGRAMS) {
    const programKey = `${program.department}:${slugify(program.title)}`;
    const existing = existingBySlug.get(program.slug);
    if (existing) {
      if (!existing.url && program.url) {
        await Program.updateOne({ _id: existing._id, url: { $in: ['', null] } }, { $set: { url: program.url } });
        existing.url = program.url;
        linksAdded += 1;
      } else {
        unchanged += 1;
      }
      continue;
    }

    if (existingKeys.has(programKey)) {
      unchanged += 1;
      continue;
    }
    await Program.create(program);
    existingKeys.add(programKey);
    created += 1;
  }

  console.log(`Done. created=${created} linksAdded=${linksAdded} unchanged=${unchanged} existing content and non-empty URLs were preserved.`);
  for (const department of PROGRAM_DEPARTMENTS) {
    const total = await Program.countDocuments({ department: department.slug });
    const published = await Program.countDocuments({ department: department.slug, status: 'published' });
    console.log(`${department.slug}: ${total} total, ${published} published`);
  }
}

const isDirectExecution =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) {
  seedPrograms()
    .catch((error) => {
      const message = error instanceof Error ? error.message : String(error);
      const safeMessage = message.replace(/mongodb(?:\+srv)?:\/\/[^\s"'`]+/gi, '[redacted MongoDB URI]');
      console.error('Program seed failed:', safeMessage);
      process.exitCode = 1;
    })
    .finally(async () => {
      await mongoose.disconnect().catch(() => {});
    });
}
