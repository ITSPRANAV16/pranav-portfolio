export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  description: string;
  price?: string; // Optional realistic starting price
  images?: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  type?: 'real' | 'exploration';
  name: string;
  description: string;
  techStack?: string[];
  duration?: string;
  role?: string;
  keyAchievements?: string[];
  architectureNotes?: string[];
  impactMetric?: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2Tall: string;
  };
}
