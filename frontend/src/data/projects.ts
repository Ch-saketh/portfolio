import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: 1,
    title: "PageMatch – Full Stack Website",
    description: "A dynamic web platform for matching users with relevant web pages based on profile preferences, with real-time interaction capabilities.",
    technologies: ["React.js", "Node.js", "Express", "MongoDB"],
    duration: "Jan 2025 – Present",
    roleResponsibilities: [
      "Built Flask APIs in Node.js and Express for profile matching and data management.",
      "Created a modern, mobile-responsive UI in React.js.",
      "Integrated MongoDB for flexible, scalable storage of user profiles.",
      "Ensured smooth user navigation and minimal load times."
    ],
    usage: "Helps users quickly find the most relevant online content, improving search efficiency and personalization.",
    category: "Full Stack Development"
  },
  {
    id: 2,
    title: "Book Recommendation System",
    description: "A hybrid machine learning model combining content-based and collaborative filtering for book recommendations. The content-based module uses TF-IDF Vectorizer with cosine similarity to retrieve similar books based on metadata, while the collaborative filtering module uses LightFM with WARP loss to recommend books based on user interaction patterns.",
    technologies: [
      "Python", 
      "Scikit-learn (TF-IDF Vectorizer, Cosine Similarity)", 
      "LightFM", 
      "WARP Loss Function", 
      "Precision@K"
    ],
    duration: "Jan 2025 – Present",
    roleResponsibilities: [
      "Implemented TF-IDF Vectorizer for feature extraction from book metadata.",
      "Applied cosine similarity for ranking and retrieving similar books.",
      "Built and tuned LightFM collaborative filtering model using WARP loss.",
      "Evaluated model performance using Precision@K."
    ],
    usage: "Enables accurate and personalized book recommendations for both new and returning users by combining content-based and collaborative approaches.",
    category: "Machine Learning"
  },
  {
    id: 3,
    title: "Cine Portal",
    description: "An interactive movie portal that allows users to browse, search, and review films, fostering a movie-loving community.",
    technologies: ["React.js", "Flask", "MongoDB"],
    duration: "Jan 2025 – Present",
    roleResponsibilities: [
      "Developed movie listing and search pages with React.js.",
      "Built Flask APIs to fetch and manage movie data from MongoDB.",
      "Implemented a review and rating system to enhance community interaction.",
      "Ensured high performance and responsiveness across devices."
    ],
    usage: "Provides movie enthusiasts with a central hub for film discovery, reviews, and discussions.",
    category: "Full Stack Development"
  }
];

export const hackathonProjects = [
  {
    id: 4,
    title: "Quantum-Secure E-Auction System",
    description: "A secure e-auction system implementing quantum key distribution for enhanced security.",
    technologies: ["React (Vite)", "TailwindCSS", "Node.js", "Express.js", "MongoDB", "WebSockets", "IBM Qiskit", "BB84 Protocol"],
    duration: "Amaravati Quantum Valley Hackathon",
    roleResponsibilities: [
      "Worked as Frontend Engineer, building the user interface using React (Vite) + TailwindCSS.",
      "Integrated frontend with backend services (Node.js, Express.js, MongoDB).",
      "Enabled real-time communication using WebSockets.",
      "Implemented security with Quantum Key Distribution (BB84 Protocol) via IBM Qiskit simulators."
    ],
    usage: "Secured 3rd Prize at the Internal Hackathon",
    category: "Quantum Computing / Hackathon"
  }
];