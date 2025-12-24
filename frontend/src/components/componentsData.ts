// src/components/componentsData.ts
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

export interface ComponentItem {
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

export const categories = ["Animations", "Layouts", "Components", "Utilities", "Text Animations"];

// Use your existing allComponents array from your file
export const allComponents: ComponentItem[] = [
  // Your existing components from your file go here
];

// SINGLE getComponentById function
export const getComponentById = (id: string | undefined): ComponentItem | undefined => {
  if (!id) return undefined;
  return allComponents.find(comp => comp.id === id);
};

export const getComponentsByCategory = (category: string): ComponentItem[] => {
  return allComponents.filter(comp => comp.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(allComponents.map(comp => comp.category)));
};