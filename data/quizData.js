const QUIZ_DATA = [
  {
    id: 1,
    unit: 1,
    question: "What is Design Thinking primarily focused on?",
    options: [
      "A human-centered approach to solving problems by focusing on people's needs",
      "A purely technical method for writing computer algorithms",
      "A traditional aesthetic art discipline strictly for visual graphic design",
      "A rigid, sequential waterfall project management framework"
    ],
    correct: 0,
    explanation: "According to the source document, Design Thinking is a human-centered, iterative approach to solving complex problems by deeply understanding people's emotional, cognitive, and practical needs."
  },
  {
    id: 2,
    unit: 1,
    question: "What are the five core stages of the Design Thinking process in their standard order?",
    options: [
      "Analyze, Plan, Design, Implement, Evaluate",
      "Empathize, Define, Ideate, Prototype, Test",
      "Research, Brainstorm, Budget, Build, Launch",
      "Observe, Hypothesis, Experiment, Conclude, Publish"
    ],
    correct: 1,
    explanation: "The document explicitly defines the five stages as Empathize (understand users), Define (state the problem), Ideate (generate solutions), Prototype (build models), and Test (validate with real users)."
  },
  {
    id: 3,
    unit: 1,
    question: "How is 'Empathy' defined in the context of Design Thinking?",
    options: [
      "Feeling sympathy or pity for people in difficult situations",
      "The ability to understand and feel what another person experiences, seeing the world through their eyes",
      "Conducting automated online surveys without personal interaction",
      "Persuading customers to like a pre-determined technical product"
    ],
    correct: 1,
    explanation: "In Design Thinking, Empathy is the ability to understand and feel what another person experiences, putting oneself in their shoes to discover hidden, unstated needs."
  },
  {
    id: 4,
    unit: 1,
    question: "Which of the following is NOT one of the primary methods used to build empathy with users?",
    options: [
      "Observation in natural context",
      "In-depth qualitative user interviews",
      "Guessing user needs based on internal executive assumptions",
      "Immersive 'walk in their shoes' experiences"
    ],
    correct: 2,
    explanation: "Design Thinking strictly warns against assuming or guessing user needs from an ivory tower. The core methods are Observation, Interviews, Immersion, and Empathy Mapping."
  },
  {
    id: 5,
    unit: 2,
    question: "What is a 'User Persona' in Design Thinking?",
    options: [
      "A fictional character created based on real user research to represent a user type",
      "A real individual customer's private confidential legal file",
      "An anonymous fake social media profile used for marketing",
      "A corporate job description for hiring frontend designers"
    ],
    correct: 0,
    explanation: "A User Persona is a semi-fictional archetype created from empirical qualitative and quantitative research that embodies the goals, pain points, behaviors, and motivations of a core user segment."
  },
  {
    id: 6,
    unit: 2,
    question: "What are the four quadrants of a standard Empathy Map?",
    options: [
      "Strengths, Weaknesses, Opportunities, Threats",
      "Says, Thinks, Does, Feels",
      "Input, Process, Output, Storage",
      "Price, Product, Promotion, Place"
    ],
    correct: 1,
    explanation: "An Empathy Map synthesizes user research across four essential quadrants: Says (direct quotes), Thinks (inner beliefs and concerns), Does (actions and behaviors observed), and Feels (emotions and anxieties)."
  },
  {
    id: 7,
    unit: 2,
    question: "What is the primary role of 'How Might We' (HMW) questions?",
    options: [
      "To criticize failed previous product ideas",
      "To reframe insights into optimistic, actionable challenges that invite creative problem-solving",
      "To calculate the financial return on investment before ideation",
      "To narrow solutions down to a single engineering specification immediately"
    ],
    correct: 1,
    explanation: "HMW questions transform discovered pain points into open, generative design questions that stimulate constructive, ambitious, and collaborative brainstorming."
  },
  {
    id: 8,
    unit: 2,
    question: "When should qualitative research be preferred over quantitative research?",
    options: [
      "When you need to measure statistically how many people click a button",
      "When exploring the 'Why' behind human behaviors, underlying motivations, and emotional pain points",
      "When calculating census demographics across 100,000 citizens",
      "When doing automated A/B testing on a checkout screen"
    ],
    correct: 1,
    explanation: "Qualitative research (interviews, diary studies, contextual observation) reveals deep nuance, emotion, and 'why' people do what they do, while quantitative research answers 'how many' and 'how much'."
  },
  {
    id: 9,
    unit: 3,
    question: "What is the key difference between Divergent Thinking and Convergent Thinking?",
    options: [
      "Divergent thinking expands and creates many possibilities; Convergent thinking narrows down and selects the best option",
      "Divergent is purely logical; Convergent is purely emotional",
      "Divergent is only used in testing; Convergent is only used in empathy",
      "There is no difference; they are identical concepts"
    ],
    correct: 0,
    explanation: "Divergent thinking explores breadth, suspending judgment to generate high idea volume. Convergent thinking applies evaluation criteria, feasibility, and prioritization to focus on optimal solutions."
  },
  {
    id: 10,
    unit: 3,
    question: "What does the acronym SCAMPER stand for in ideation?",
    options: [
      "Substitute, Combine, Adapt, Modify/Magnify, Put to another use, Eliminate, Reverse/Rearrange",
      "Select, Create, Analyze, Measure, Prototype, Evaluate, Release",
      "Speed, Cost, Agility, Market, Performance, Efficiency, Reliability",
      "Simplify, Consolidate, Automate, Monitor, Package, Execute, Review"
    ],
    correct: 0,
    explanation: "SCAMPER is a powerful creative thinking prompt tool representing Substitute, Combine, Adapt, Modify/Magnify, Put to other uses, Eliminate, and Reverse/Rearrange."
  },
  {
    id: 11,
    unit: 3,
    question: "What is the golden rule during a creative Brainstorming session?",
    options: [
      "Immediately critique every unrealistic idea to save time",
      "Defer judgment and encourage wild ideas; aim for sheer quantity first",
      "Only managers are allowed to propose solutions",
      "Select the final solution within the first 5 minutes"
    ],
    correct: 1,
    explanation: "The core rule of Brainstorming in Design Thinking is: 'Defer Judgment'. Premature evaluation kills creative exploration. Volume of ideas leads to breakthrough quality."
  },
  {
    id: 12,
    unit: 4,
    question: "What is a Prototype?",
    options: [
      "A complete, finalized mass-production manufactured unit ready for commercial sale",
      "A simple, tangible, early representation of an idea built to learn, test, and gather feedback",
      "A 500-page written legal patent document",
      "A software bug tracking ticket"
    ],
    correct: 1,
    explanation: "A prototype is a tangible, testable model of an idea created to explore possibilities, learn quickly from user interaction, and fail cheaply before committing heavy resources."
  },
  {
    id: 13,
    unit: 4,
    question: "What defines a Low-Fidelity prototype compared to a High-Fidelity prototype?",
    options: [
      "Low-fidelity uses paper sketches and cardboard to test concepts fast and cheap; high-fidelity closely mimics the final product in look and function",
      "Low-fidelity is always digital; high-fidelity is always physical",
      "Low-fidelity takes months to construct; high-fidelity takes minutes",
      "Low-fidelity is shared with investors; high-fidelity is discarded immediately"
    ],
    correct: 0,
    explanation: "Low-fidelity prototypes (sketches, paper mockups, foam models) enable rapid validation of core concepts with minimal cost. High-fidelity prototypes look and feel near-identical to finished production."
  },
  {
    id: 14,
    unit: 4,
    question: "What does MVP stand for in product design?",
    options: [
      "Most Valuable Person",
      "Minimum Viable Product",
      "Maximum Velocity Planning",
      "Multi-Variable Platform"
    ],
    correct: 1,
    explanation: "MVP stands for Minimum Viable Product: the version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort."
  },
  {
    id: 15,
    unit: 4,
    question: "During user testing of a prototype, what should the designer primarily do?",
    options: [
      "Defend the design and explain how the user is using it incorrectly",
      "Observe carefully, listen actively, and let the user explore without guiding or defending",
      "Hide all flaws so the user gives a 5-star rating",
      "Interrupt the user whenever they struggle"
    ],
    correct: 1,
    explanation: "The golden rule of testing is 'Show, don't tell'. You test the prototype, not the user. Observe where they hesitate, get confused, or smile, and ask open-ended questions."
  },
  {
    id: 16,
    unit: 5,
    question: "What are the three essential lenses of innovation that Design Thinking balances?",
    options: [
      "Desirability (Human), Feasibility (Technical), and Viability (Business)",
      "Speed, Advertising, and Cheaper Labor",
      "Hardware, Software, and Networking",
      "Politics, Media, and Regulations"
    ],
    correct: 0,
    explanation: "Sustainable innovation occurs at the sweet spot intersection of Desirability (What do people need?), Feasibility (What is technologically possible?), and Viability (What makes business sense?)."
  },
  {
    id: 17,
    unit: 5,
    question: "How did Airbnb famously use Design Thinking to save their company from bankruptcy in 2009?",
    options: [
      "They spent millions on celebrity TV advertisements",
      "Founders personally visited hosts in New York with high-resolution cameras to understand why listings weren't booking",
      "They fired all their customer service representatives to cut costs",
      "They pivoted to becoming a social media messaging app"
    ],
    correct: 1,
    explanation: "The Airbnb founders traveled to New York, met real hosts and guests, discovered that poor cell-phone photos were destroying trust, and personally photographed apartments—doubling weekly revenue almost immediately."
  },
  {
    id: 18,
    unit: 5,
    question: "In the GE Healthcare Adventure Series case study by Doug Dietz, what core insight transformed the MRI experience for pediatric patients?",
    options: [
      "Children wanted cheaper hospital bills",
      "Children were terrified of the sterile, noisy MRI machine; transforming scanners into themed adventures (pirate ships, jungles) reduced sedation rates from 80% to under 1%",
      "Faster scanning speeds solved all emotional fears",
      "Giving children video games eliminated the need for medical scans"
    ],
    correct: 1,
    explanation: "Doug Dietz discovered that 80% of pediatric patients needed heavy sedation out of sheer terror. By reframing the scanner as an immersive storybook adventure, sedation plummeted to <1% and child anxiety vanished."
  },
  {
    id: 19,
    unit: 6,
    question: "In the Part C Healthcare startup case study for elderly medication adherence, what was a key physical/sensory challenge identified in the Empathize stage?",
    options: [
      "Elderly users wanted higher screen brightness and loud electronic alarms only",
      "Tremors, declining eyesight, memory lapses, and complex multi-pill schedules caused severe fear of overdose",
      "Elderly users refused to take prescribed medications entirely",
      "Smartphones were completely inaccessible to all people over 60"
    ],
    correct: 1,
    explanation: "The case study identifies that elderly patients often suffer from polypharmacy, visual impairment, arthritis/tremors, and memory decline, requiring high-contrast visuals, voice cues, simplified pill recognition, and caregiver sync."
  },
  {
    id: 20,
    unit: 6,
    question: "In community social problem-solving (e.g. urban waste segregation), what is the key lesson of the Design Thinking process?",
    options: [
      "Imposing heavy penalties without user understanding is always the most effective solution",
      "Understanding household convenience, cultural habits, and incentive loops drives lasting behavioral change far better than purely technical interventions",
      "Technological solutions should be built before talking to residents or sanitation workers",
      "Waste segregation cannot be improved in municipal systems"
    ],
    correct: 1,
    explanation: "Design Thinking proves that social challenges are human behavior problems. Lasting adoption requires co-designing with residents and waste collectors to align convenience, dignity, and visual color-coded clarity."
  }
];

window.QUIZ_DATA = QUIZ_DATA;
