// Component data with full documentation
export interface ComponentExample {
  id: string;
  title: string;
  description: string;
  code: string;
}

export interface ComponentProp {
  name: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
}

export interface ComponentDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  isNew?: boolean;
  dependencies: string[];
  installation: string;
  props: ComponentProp[];
  usage: string;
  typescript: string;
  javascript: string;
  tailwind?: string;
  examples: ComponentExample[];
}

// All your component details go here
export const allComponentDetails: ComponentDetail[] = [
  {
    id: 'split-text',
    title: 'Split Text Animation',
    description: 'GSAP-powered text splitting animation with scroll triggers',
    category: 'Text Animations',
    tags: ['animation', 'gsap', 'text', 'scroll'],
    isNew: true,
    dependencies: ['gsap', '@gsap/react'],
    installation: 'npm install gsap @gsap/react',
    props: [
      {
        name: 'text',
        type: 'string',
        default: '""',
        required: true,
        description: 'Text content to animate'
      },
      {
        name: 'delay',
        type: 'number',
        default: '100',
        required: false,
        description: 'Delay between characters (ms)'
      }
      // Add more props...
    ],
    usage: `import SplitText from './SplitText';\n\n<SplitText text="Hello World" delay={50} />`,
    typescript: `// TypeScript implementation code here...`,
    javascript: `// JavaScript implementation code here...`,
    tailwind: `// Tailwind classes usage here...`,
    examples: [
      {
        id: 'basic',
        title: 'Basic Split Animation',
        description: 'Simple character split with fade-in',
        code: `<SplitText text="Welcome" delay={80} />`
      }
    ]
  },
  {
    id: 'profile-card',
    title: '3D Profile Card',
    description: 'Interactive 3D profile card with tilt effect',
    category: 'Components',
    tags: ['3d', 'interactive', 'tilt', 'glassmorphism'],
    dependencies: ['react', 'framer-motion'],
    installation: 'npm install framer-motion',
    props: [
      // Add props for ProfileCard...
    ],
    usage: `// Usage example...`,
    typescript: `// TypeScript code...`,
    javascript: `// JavaScript code...`,
    examples: []
  }
  // Add more components...
];

// Helper functions with proper TypeScript types
export const getComponentById = (id: string | undefined): ComponentDetail | undefined => {
  if (!id) return undefined;
  return allComponentDetails.find(comp => comp.id === id);
};

export const getComponentsByCategory = (category: string): ComponentDetail[] => {
  return allComponentDetails.filter(comp => comp.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = allComponentDetails.map((comp: ComponentDetail) => comp.category);
  return [...new Set(categories)];
};

// Fix for map functions in React components
export const mapTags = (callback: (tag: string, index: number) => any) => {
  return allComponentDetails.flatMap(comp => comp.tags.map(callback));
};

export const mapDependencies = (callback: (dep: string, index: number) => any) => {
  return allComponentDetails.flatMap(comp => comp.dependencies.map(callback));
};