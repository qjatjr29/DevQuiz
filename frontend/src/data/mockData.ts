// Knowledge Cards Data
export interface KnowledgeCard {
  id: string;
  category: string;
  keyword: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const knowledgeCards: KnowledgeCard[] = [
  {
    id: "1",
    category: "Frontend",
    keyword: "Key Concept",
    title: "Virtual DOM",
    description:
      "A lightweight copy of the real DOM. React updates this first to compare changes and optimize rendering performance before touching the browser.",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    category: "JavaScript",
    keyword: "Async Pattern",
    title: "Promise & Async/Await",
    description:
      "Promises represent eventual completion or failure of async operations. Async/await makes asynchronous code look synchronous and easier to understand.",
    imageUrl:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    category: "React",
    keyword: "Hook Pattern",
    title: "useEffect Hook",
    description:
      "Handles side effects in function components. It runs after render and can optionally clean up before unmounting or re-running.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    category: "TypeScript",
    keyword: "Type Safety",
    title: "Generic Types",
    description:
      "Allow creating reusable components that work with multiple types while maintaining type safety. Essential for building flexible yet type-safe code.",
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
  },
  {
    id: "5",
    category: "CSS",
    keyword: "Layout",
    title: "Flexbox vs Grid",
    description:
      "Flexbox is ideal for one-dimensional layouts (row or column), while Grid excels at two-dimensional layouts with both rows and columns.",
    imageUrl:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop",
  },
];

// Quiz Questions Data
export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    category: "React",
    question:
      "What is the correct way to update state based on the previous state?",
    code: "const [count, setCount] = useState(0);\nsetCount(???);",
    options: ["count + 1", "prev => prev + 1", "count++", "this.count + 1"],
    correctAnswer: 1,
    explanation:
      "Using a function that receives the previous state ensures you always work with the latest state value, avoiding race conditions.",
  },
  {
    id: "2",
    category: "JavaScript",
    question: "What will be logged to the console?",
    code: "console.log(typeof null);",
    options: ["null", "undefined", "object", "boolean"],
    correctAnswer: 2,
    explanation:
      'This is a known JavaScript quirk. typeof null returns "object" due to a bug in the original JavaScript implementation.',
  },
  {
    id: "3",
    category: "TypeScript",
    question:
      "Which syntax correctly defines an optional property in TypeScript?",
    code: "interface User {\n  name: ???\n  email: string;\n}",
    options: ["string | undefined", "string?", "?string", "optional string"],
    correctAnswer: 1,
    explanation:
      "The ? after the property name makes it optional. This is equivalent to string | undefined.",
  },
  {
    id: "4",
    category: "CSS",
    question: "Which CSS property creates a flexible container?",
    options: [
      "display: flex",
      "position: flex",
      "flex: container",
      "container: flex",
    ],
    correctAnswer: 0,
    explanation:
      "display: flex creates a flex container, enabling flexbox layout for its children.",
  },
  {
    id: "5",
    category: "React",
    question:
      "How do you prevent a retain cycle in a closure when referencing self?",
    code: "const closure = { [?] in\n  self.doSomething()\n}",
    options: ["[unowned self]", "[weak self]", "__block", "strong self"],
    correctAnswer: 1,
    explanation:
      "[weak self] creates a weak reference to self, preventing retain cycles while still allowing access.",
  },
];

// Ranking Data
export interface RankingUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  level: number;
  title: string;
  points: number;
}

export const weeklyRanking: RankingUser[] = [
  {
    id: "1",
    rank: 1,
    name: "DevMaster",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    level: 42,
    title: "Grand Master",
    points: 2450,
  },
  {
    id: "2",
    rank: 2,
    name: "CodeNinja",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    level: 38,
    title: "Expert",
    points: 1980,
  },
  {
    id: "3",
    rank: 3,
    name: "ByteWizard",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    level: 35,
    title: "Expert",
    points: 1820,
  },
  {
    id: "4",
    rank: 4,
    name: "SyntaxSage",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    level: 32,
    title: "Skilled",
    points: 1650,
  },
  {
    id: "5",
    rank: 5,
    name: "LoopLegend",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    level: 30,
    title: "Skilled",
    points: 1520,
  },
];

export const monthlyRanking: RankingUser[] = [
  {
    id: "1",
    rank: 1,
    name: "CodeNinja",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    level: 38,
    title: "Expert",
    points: 8450,
  },
  {
    id: "2",
    rank: 2,
    name: "DevMaster",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    level: 42,
    title: "Grand Master",
    points: 7980,
  },
  {
    id: "3",
    rank: 3,
    name: "SyntaxSage",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    level: 32,
    title: "Skilled",
    points: 6820,
  },
  {
    id: "4",
    rank: 4,
    name: "ByteWizard",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    level: 35,
    title: "Expert",
    points: 6450,
  },
  {
    id: "5",
    rank: 5,
    name: "LoopLegend",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    level: 30,
    title: "Skilled",
    points: 5920,
  },
];

// Quiz History Data
export interface QuizRecord {
  id: string;
  date: string;
  topic: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: QuizQuestion[];
}

export const quizHistory: QuizRecord[] = [
  {
    id: "1",
    date: "2024-01-15",
    topic: "React Hooks",
    score: 80,
    totalQuestions: 5,
    correctAnswers: 4,
    wrongAnswers: [quizQuestions[0]],
  },
  {
    id: "2",
    date: "2024-01-14",
    topic: "JavaScript Basics",
    score: 60,
    totalQuestions: 5,
    correctAnswers: 3,
    wrongAnswers: [quizQuestions[1], quizQuestions[3]],
  },
  {
    id: "3",
    date: "2024-01-13",
    topic: "TypeScript",
    score: 100,
    totalQuestions: 5,
    correctAnswers: 5,
    wrongAnswers: [],
  },
];
