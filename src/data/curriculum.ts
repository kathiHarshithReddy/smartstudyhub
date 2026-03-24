export interface Video {
  id: string;
  title: string;
  channel: string;
}

export interface Subject {
  code: string;
  name: string;
  credits: number;
  category: string;
  topics: string[];
  videos: Video[];
}

export interface Semester {
  id: number;
  name: string;
  subjects: Subject[];
}

export const curriculum: Semester[] = [
  {
    id: 1,
    name: "Semester 1",
    subjects: [
      {
        code: "BMATS101",
        name: "Applied Mathematics-I (Calculus & Linear Algebra)",
        credits: 4,
        category: "Math",
        topics: [
          "Differential Calculus (Taylor's series, partial derivatives)",
          "Integral Calculus (multiple integrals, Beta & Gamma functions)",
          "Linear Algebra (rank of matrix, linear systems of equations, eigenvalues, and eigenvectors)"
        ],
        videos: [
          { id: "WUvTyaaNkzM", title: "Essence of linear algebra", channel: "3Blue1Brown" },
          { id: "r6sGWTCMz2k", title: "Essence of calculus", channel: "3Blue1Brown" },
          { id: "XoZaXENtvGk", title: "Calculus 1 - Full College Course", channel: "freeCodeCamp" },
          { id: "8mve0UoSxTo", title: "Linear Algebra - Full College Course", channel: "freeCodeCamp" },
          { id: "fNk_zzaMoSs", title: "Vectors | Chapter 1, Essence of linear algebra", channel: "3Blue1Brown" }
        ]
      },
      {
        code: "BPHYS102",
        name: "Applied Physics for CSE Stream",
        credits: 4,
        category: "Core",
        topics: [
          "Quantum Mechanics (wave-particle dualism, Schrodinger wave equation)",
          "Electrical Properties (resistance, Fermi level)",
          "Semiconductor Physics (intrinsic/extrinsic semiconductors)",
          "Laser and Optical Fibers"
        ],
        videos: [
          { id: "p7bzE1E5PMY", title: "Quantum Physics Full Course", channel: "MIT OpenCourseWare" },
          { id: "qO_W70VeG1g", title: "Semiconductor Physics", channel: "Neso Academy" },
          { id: "gB9n2gHsHN4", title: "Lasers and Optical Fibers", channel: "Physics Wallah" }
        ]
      },
      {
        code: "BPOPS103",
        name: "Programming in C / Python Programming",
        credits: 3,
        category: "Core",
        topics: [
          "Introduction to programming",
          "Data types, operators, branching and looping statements",
          "Arrays and strings",
          "Functions and structures",
          "File management"
        ],
        videos: [
          { id: "bWpmLZKtcHc", title: "C Programming Tutorial for Beginners", channel: "Neso Academy" },
          { id: "_uQrJ0TkZlc", title: "Python Tutorial for Beginners", channel: "Programming with Mosh" },
          { id: "KJgsSFOSQv0", title: "C Programming Tutorial for Beginners", channel: "freeCodeCamp" },
          { id: "EjavYOFoNW0", title: "C Programming Full Course", channel: "Bro Code" }
        ]
      },
      {
        code: "BEEES104",
        name: "Introduction to Electronics/Electrical Engineering",
        credits: 3,
        category: "Core",
        topics: [
          "Fundamentals of electronics components (diodes, transistors)",
          "Operational amplifiers",
          "Digital electronics (logic gates)",
          "Introduction to IoT and embedded systems"
        ],
        videos: [
          { id: "W-YmE-2TjXQ", title: "Basic Electronics For Beginners", channel: "Tech Maker" },
          { id: "M0mx8S05v60", title: "Logic Gates, Truth Tables", channel: "The Organic Chemistry Tutor" },
          { id: "UrjG6qB2xcA", title: "Introduction to IoT", channel: "Simplilearn" }
        ]
      },
      {
        code: "BCAED105",
        name: "Computer-Aided Engineering Drawing (CAED)",
        credits: 3,
        category: "Core",
        topics: [
          "Orthographic projections of points, lines, and planes",
          "Projection of solids",
          "Section of solids",
          "Development of surfaces"
        ],
        videos: [
          { id: "O-O-H0_tZ3g", title: "Engineering Drawing Tutorials", channel: "Manas Patnaik" },
          { id: "7r1v-Yc1XwU", title: "Orthographic Projections", channel: "Tickle's Academy" }
        ]
      },
      {
        code: "BIDTK106",
        name: "Innovation and Design Thinking Lab",
        credits: 1,
        category: "Project",
        topics: [
          "Problem-based learning",
          "Design thinking methodology",
          "Project documentation",
          "Prototyping"
        ],
        videos: [
          { id: "_r0VX-aU_T8", title: "What is Design Thinking?", channel: "AJ&Smart" },
          { id: "pXtN4y3O35M", title: "Design Thinking In 3 Minutes", channel: "Innovation Training" }
        ]
      },
      {
        code: "BKSKK107",
        name: "Samskrutika / Balake Kannada",
        credits: 1,
        category: "Core",
        topics: [
          "Basic Kannada Vocabulary",
          "Conversational Kannada",
          "Reading and Writing Kannada Scripts",
          "Karnataka Culture and History"
        ],
        videos: [
          { id: "eZ7Z2Z2Z2Z2", title: "Learn Kannada Basics", channel: "Learn Kannada" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Semester 2",
    subjects: [
      {
        code: "BMATC201",
        name: "Advanced Calculus & Numerical Methods",
        credits: 4,
        category: "Math",
        topics: ["Multiple Integrals", "Vector Integration", "Partial Differential Equations", "Numerical Methods 1", "Numerical Methods 2"],
        videos: [
          { id: "p_di4Zn4wz4", title: "Differential equations, studying the unpredictable", channel: "3Blue1Brown" },
          { id: "ly4S0oi3Yz8", title: "Taylor series | Chapter 10, Essence of calculus", channel: "3Blue1Brown" },
          { id: "bWpmLZKtcHc", title: "Numerical Methods", channel: "Neso Academy" },
          { id: "XoZaXENtvGk", title: "Calculus 2 - Full College Course", channel: "freeCodeCamp" },
          { id: "8mve0UoSxTo", title: "Linear Algebra 2", channel: "freeCodeCamp" }
        ]
      },
      {
        code: "BPLCK205B",
        name: "Introduction to Python Programming",
        credits: 3,
        category: "Core",
        topics: ["Introduction to Python", "Data Types and Operators", "Control Flow and Functions", "Lists, Tuples, and Dictionaries", "File Handling and Exceptions"],
        videos: [
          { id: "_uQrJ0TkZlc", title: "Python Tutorial for Beginners", channel: "Programming with Mosh" },
          { id: "rfscVS0vtbw", title: "Learn Python - Full Course", channel: "freeCodeCamp" },
          { id: "vLqTf2b6GZw", title: "Python Tutorial for Beginners", channel: "Jenny's Lectures" },
          { id: "QXeEoD0pB3E", title: "Python Tutorial for Beginners", channel: "Telusko" },
          { id: "YYXdXT2l-Gg", title: "Python Programming Full Course", channel: "Bro Code" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Semester 3",
    subjects: [
      {
        code: "BCS304",
        name: "Data Structures",
        credits: 3,
        category: "Core",
        topics: ["Introduction to DS", "Stacks and Queues", "Linked Lists", "Trees", "Graphs"],
        videos: [
          { id: "B31LgI4Y4DQ", title: "Data Structures Easy to Advanced Course", channel: "William Fiset" },
          { id: "AT14lCXuMKI", title: "Data Structures and Algorithms in Java", channel: "Jenny's Lectures" },
          { id: "92S4zgXN17o", title: "Data Structures: Linked Lists", channel: "mycodeschool" },
          { id: "RBSGKlAvoiM", title: "Data Structures: Trees", channel: "mycodeschool" },
          { id: "0IAPZzGSbME", title: "Data Structures: Graphs", channel: "mycodeschool" }
        ]
      },
      {
        code: "BCS306A",
        name: "OOP with Java",
        credits: 3,
        category: "Core",
        topics: ["Introduction to Java", "Classes and Objects", "Inheritance and Polymorphism", "Interfaces and Packages", "Exception Handling"],
        videos: [
          { id: "eIrMbAQSU34", title: "Java Tutorial for Beginners", channel: "Programming with Mosh" },
          { id: "grEKMHGYyns", title: "Java Full Course", channel: "Bro Code" },
          { id: "A74TOX803D0", title: "Java Programming Tutorial", channel: "freeCodeCamp" },
          { id: "ntLJmHOJ0ME", title: "Java OOPs Concepts", channel: "Edureka" },
          { id: "bSrm9RXwBaI", title: "Java Exception Handling", channel: "Telusko" }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Semester 4",
    subjects: [
      {
        code: "BCS402",
        name: "Design & Analysis of Algorithms",
        credits: 3,
        category: "Core",
        topics: ["Introduction to Algorithms", "Divide and Conquer", "Greedy Method", "Dynamic Programming", "Backtracking"],
        videos: [
          { id: "0IAPZzGSbME", title: "Algorithms Course - Graph Theory", channel: "freeCodeCamp" },
          { id: "0bWRfkWKjzE", title: "Algorithms: Introduction", channel: "Abdul Bari" },
          { id: "mB5HXBb_HY8", title: "Divide and Conquer", channel: "Abdul Bari" },
          { id: "HxgZI5hqD_c", title: "Greedy Method", channel: "Abdul Bari" },
          { id: "ENyox7kNKeY", title: "Dynamic Programming", channel: "Abdul Bari" }
        ]
      },
      {
        code: "BCS403",
        name: "Operating Systems",
        credits: 3,
        category: "Core",
        topics: ["Introduction to OS", "Process Management", "Memory Management", "File Systems", "Deadlocks"],
        videos: [
          { id: "vBURTt97EkA", title: "Operating System Full Course", channel: "Neso Academy" },
          { id: "RozoeWzT7IM", title: "Operating Systems: Crash Course", channel: "CrashCourse" },
          { id: "WJ-UaAaumNA", title: "Process Scheduling", channel: "Gate Smashers" },
          { id: "qlH4-oHnBb8", title: "Memory Management", channel: "Gate Smashers" },
          { id: "rFJUvdOECzQ", title: "Deadlock in OS", channel: "Jenny's Lectures" }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Semester 5",
    subjects: [
      {
        code: "BCS502",
        name: "Computer Networks",
        credits: 4,
        category: "Core",
        topics: ["Introduction to Networks", "Physical Layer", "Data Link Layer", "Network Layer", "Transport & Application Layer"],
        videos: [
          { id: "IPvYjXCsTg8", title: "Computer Networks Full Course", channel: "Neso Academy" },
          { id: "qiQR5rTSshw", title: "Computer Networking Course", channel: "freeCodeCamp" },
          { id: "3QhU9jd03a0", title: "OSI Model Explained", channel: "PowerCert Animated Videos" },
          { id: "7_LPdttKXPc", title: "How the Internet Works", channel: "Code.org" },
          { id: "JFF2vJaN0Cw", title: "TCP/IP Model", channel: "Gate Smashers" }
        ]
      },
      {
        code: "BCS503",
        name: "Database Management Systems",
        credits: 3,
        category: "Core",
        topics: ["Introduction to DBMS", "Relational Model", "SQL", "Database Design", "Transaction Management"],
        videos: [
          { id: "HXV3zeQKqGY", title: "SQL Tutorial - Full Database Course", channel: "freeCodeCamp" },
          { id: "kBdlM6hNDAE", title: "DBMS Full Course", channel: "Gate Smashers" },
          { id: "ztHopE5Wnpc", title: "Database Design Course", channel: "freeCodeCamp" },
          { id: "7S_tz1z_5bA", title: "MySQL Tutorial for Beginners", channel: "Programming with Mosh" },
          { id: "eXW-OEB9q8s", title: "Entity Relationship Diagram", channel: "Lucidchart" }
        ]
      },
      {
        code: "BCS501",
        name: "Automata Theory and Compiler Design",
        credits: 4,
        category: "Core",
        topics: ["Finite Automata", "Regular Expressions", "Context Free Grammars", "Lexical Analysis", "Syntax Analysis"],
        videos: [
          { id: "58N2N7zJGrQ", title: "Theory of Computation Full Course", channel: "Neso Academy" },
          { id: "Qkwj65l_96I", title: "Compiler Design Full Course", channel: "Gate Smashers" },
          { id: "EtGq1hW_2u0", title: "Finite State Machines", channel: "Computerphile" },
          { id: "41-I22p5_z4", title: "Turing Machines", channel: "Computerphile" },
          { id: "1qOMlqE6L-o", title: "Lexical Analysis", channel: "Jenny's Lectures" }
        ]
      },
      {
        code: "BCS504",
        name: "Artificial Intelligence & Machine Learning",
        credits: 3,
        category: "Core",
        topics: ["Introduction to AI", "Search Algorithms", "Knowledge Representation", "Supervised Learning", "Unsupervised Learning"],
        videos: [
          { id: "aircAruvnKk", title: "But what is a neural network?", channel: "3Blue1Brown" },
          { id: "Gv9_4yMHFhI", title: "Machine Learning Tutorial", channel: "StatQuest" },
          { id: "JcI5Vnw0b2c", title: "Neural Networks from Scratch", channel: "Sentdex" },
          { id: "i_LwzRVP7bg", title: "Machine Learning Full Course", channel: "freeCodeCamp" },
          { id: "obQhOqeyXvI", title: "A* Pathfinding Algorithm", channel: "Sebastian Lague" }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Semester 6",
    subjects: [
      {
        code: "BCS601",
        name: "Software Engineering & Project Management",
        credits: 3,
        category: "Core",
        topics: ["Software Process Models", "Requirements Engineering", "Software Design", "Software Testing", "Project Management"],
        videos: [
          { id: "sB2iLSvPEjY", title: "Software Engineering Full Course", channel: "Gate Smashers" },
          { id: "OqjJ7JxwQyU", title: "Agile Project Management", channel: "Edureka" },
          { id: "qO2GzO_l-EI", title: "Software Testing Tutorial", channel: "Edureka" },
          { id: "Z6f9ckEElsU", title: "Scrum in under 5 minutes", channel: "Scrum Alliance" },
          { id: "bEroNNzqlF4", title: "UML Diagrams Full Course", channel: "freeCodeCamp" }
        ]
      },
      {
        code: "BCS602",
        name: "Full Stack Development",
        credits: 4,
        category: "Core",
        topics: ["HTML/CSS Basics", "JavaScript Fundamentals", "ReactJS", "NodeJS & Express", "MongoDB"],
        videos: [
          { id: "mU6anWqZJcc", title: "HTML & CSS Full Course", channel: "Bro Code" },
          { id: "jS4aFq5-91M", title: "JavaScript Programming", channel: "freeCodeCamp" },
          { id: "bMknfKXIFA8", title: "React Course - Beginner's Tutorial", channel: "freeCodeCamp" },
          { id: "Oe421EPjeBE", title: "Node.js and Express.js", channel: "freeCodeCamp" },
          { id: "ExcRbA7fy_A", title: "MongoDB Crash Course", channel: "Traversy Media" }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Semester 7",
    subjects: [
      {
        code: "BCS701",
        name: "Cloud Computing",
        credits: 3,
        category: "Core",
        topics: ["Introduction to Cloud", "Cloud Models (IaaS, PaaS, SaaS)", "Virtualization", "Cloud Security", "AWS/Azure Basics"],
        videos: [
          { id: "M988_fsOSWo", title: "Cloud Computing Tutorial", channel: "Simplilearn" },
          { id: "EN4fEbcFZ_E", title: "AWS Certified Cloud Practitioner", channel: "freeCodeCamp" },
          { id: "GzbKb59my3U", title: "Docker in 100 Seconds", channel: "Fireship" },
          { id: "X48VuDVv0do", title: "Kubernetes Crash Course", channel: "TechWorld with Nana" },
          { id: "aHbE3pTyGvQ", title: "What is Cloud Computing?", channel: "IBM Technology" }
        ]
      },
      {
        code: "BCS702",
        name: "Big Data Analytics",
        credits: 3,
        category: "Core",
        topics: ["Introduction to Big Data", "Hadoop Ecosystem", "MapReduce", "NoSQL Databases", "Data Analytics with Spark"],
        videos: [
          { id: "bAyrObl7TYE", title: "Big Data In 5 Minutes", channel: "Simplilearn" },
          { id: "1vbXmCrkT3Y", title: "Hadoop Tutorial For Beginners", channel: "Edureka" },
          { id: "Qyv0S_tA2m0", title: "Apache Spark Crash Course", channel: "freeCodeCamp" },
          { id: "0sOvCWFmrtA", title: "NoSQL Databases Explained", channel: "IBM Technology" },
          { id: "4vEqE3qH11Y", title: "MapReduce Explained", channel: "Simplilearn" }
        ]
      },
      {
        code: "BCS703",
        name: "Internet of Things",
        credits: 3,
        category: "Core",
        topics: ["Introduction to IoT", "IoT Architecture", "Sensors and Actuators", "IoT Protocols", "IoT Applications"],
        videos: [
          { id: "LlhmzVL5bm8", title: "Internet of Things (IoT) | What is IoT", channel: "Simplilearn" },
          { id: "UrHXNAO8YBg", title: "IoT Architecture", channel: "Edureka" },
          { id: "h0gWfVCSGQQ", title: "Arduino Tutorial", channel: "Programming Knowledge" },
          { id: "mX1Jp3A1kX0", title: "Raspberry Pi Beginner's Guide", channel: "Tech Craft" },
          { id: "Q3ur8wzzhWU", title: "MQTT Protocol Explained", channel: "Steve's Internet Guide" }
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Semester 8",
    subjects: [
      {
        code: "BCS801",
        name: "Project Work",
        credits: 10,
        category: "Project",
        topics: ["Project Planning", "Requirement Analysis", "System Design", "Implementation", "Testing & Deployment"],
        videos: [
          { id: "OqjJ7JxwQyU", title: "Agile Project Management", channel: "Edureka" },
          { id: "sB2iLSvPEjY", title: "Software Engineering", channel: "Gate Smashers" },
          { id: "bEroNNzqlF4", title: "UML Diagrams", channel: "freeCodeCamp" },
          { id: "RGOj5yH7evk", title: "Git and GitHub for Beginners", channel: "freeCodeCamp" },
          { id: "W_jP6SDEGs8", title: "How to Deploy a Website", channel: "Fireship" }
        ]
      }
    ]
  }
];
