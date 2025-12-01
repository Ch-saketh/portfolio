export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  duration: string;
  roleResponsibilities: string[];
  usage: string;
  category?: string;
}