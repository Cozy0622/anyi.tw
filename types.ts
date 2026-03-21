
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface BlogArticle {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  tags: string[];
}
