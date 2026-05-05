export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'devops' | 'language';
  proficiency: number; // 0-100
  description: string;
  connections: string[]; // IDs of related skills
}

export const categoryColors: Record<string, string> = {
  frontend: '#00F5FF',
  backend: '#E2E8F0',
  ai: '#A78BFA',
  devops: '#34D399',
  language: '#F472B6',
};

export const skills: Skill[] = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    proficiency: 92,
    description: 'Component architecture, hooks, context, server components. Built 10+ production apps.',
    connections: ['nextjs', 'typescript', 'threejs'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    proficiency: 88,
    description: 'App Router, SSR/SSG, API routes, middleware. Primary framework for web apps.',
    connections: ['react', 'typescript', 'tailwind'],
  },
  {
    id: 'threejs',
    name: 'Three.js',
    category: 'frontend',
    proficiency: 72,
    description: 'React Three Fiber, 3D scenes, shaders, post-processing for immersive experiences.',
    connections: ['react', 'typescript'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    category: 'frontend',
    proficiency: 90,
    description: 'Utility-first CSS, custom design systems, responsive layouts, animation utilities.',
    connections: ['react', 'nextjs'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'language',
    proficiency: 88,
    description: 'Type-safe development, generics, utility types, strict mode across all projects.',
    connections: ['react', 'nextjs', 'nodejs'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'language',
    proficiency: 90,
    description: 'FastAPI, data pipelines, ML workflows, scripting. Primary backend language.',
    connections: ['fastapi', 'langchain', 'tensorflow'],
  },
  {
    id: 'java',
    name: 'Java',
    category: 'language',
    proficiency: 82,
    description: 'Spring Boot, microservices, enterprise patterns, concurrent programming.',
    connections: ['nodejs'],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    proficiency: 85,
    description: 'Express, WebSocket servers, REST APIs, real-time event-driven architectures.',
    connections: ['typescript', 'react', 'mongodb'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    proficiency: 86,
    description: 'Async Python APIs, auto-docs, dependency injection, ML model serving.',
    connections: ['python', 'postgresql'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    proficiency: 80,
    description: 'Complex queries, indexing, full-text search, JSON operations, schema design.',
    connections: ['fastapi', 'nodejs'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'backend',
    proficiency: 78,
    description: 'Document modeling, aggregation pipelines, Atlas search, change streams.',
    connections: ['nodejs'],
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ai',
    proficiency: 84,
    description: 'RAG pipelines, agent frameworks, tool calling, memory management for LLM apps.',
    connections: ['python', 'rag'],
  },
  {
    id: 'rag',
    name: 'RAG',
    category: 'ai',
    proficiency: 86,
    description: 'Retrieval-Augmented Generation: vector stores, embedding models, hybrid search.',
    connections: ['langchain', 'python', 'faiss'],
  },
  {
    id: 'faiss',
    name: 'FAISS',
    category: 'ai',
    proficiency: 75,
    description: 'Vector similarity search, index optimization, GPU-accelerated nearest neighbor.',
    connections: ['rag', 'python'],
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'ai',
    proficiency: 70,
    description: 'Model training, computer vision pipelines, TFLite deployment.',
    connections: ['python'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    proficiency: 78,
    description: 'Containerization, multi-stage builds, compose orchestration.',
    connections: ['kubernetes'],
  },
  {
    id: 'kubernetes',
    name: 'K8s',
    category: 'devops',
    proficiency: 65,
    description: 'Deployment configs, services, ingress, Helm charts for microservices.',
    connections: ['docker'],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'devops',
    proficiency: 92,
    description: 'Branching strategies, rebasing, CI/CD workflows, monorepo management.',
    connections: ['docker'],
  },
];
