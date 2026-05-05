export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  codeSnippet: string;
  architectureDescription: string;
  year: string;
  role: string;
}

export const projects: Project[] = [
  {
    id: 'nyayavani',
    title: 'NyayaVani',
    description:
      'AI-powered legal assistant that democratizes access to Indian legal knowledge. Uses RAG pipelines with vector search across 10K+ legal documents for precise case law retrieval.',
    techStack: ['Python', 'RAG', 'LangChain', 'FAISS', 'React', 'FastAPI'],
    link: '#',
    year: '2025',
    role: 'Generative AI + Streamlit',
    codeSnippet: `// RAG Pipeline Core
const pipeline = async (query) => {
  const embeddings = await encode(query);
  const docs = await vectorDB.search(embeddings, { k: 5 });
  const context = docs.map(d => d.content).join('\\n');
  return llm.generate({ context, query });
};`,
    architectureDescription:
      'User Query → Embedding Model → FAISS Vector Store → Top-K Retrieval → LLM Context Window → Structured Response → React Frontend',
  },
  {
    id: 'omnicopilot',
    title: 'OmniCopilot',
    description:
      'Multi-service AI workspace assistant integrating Google Meet, local OS agent with security guardrails, and intelligent tool-calling for seamless productivity.',
    techStack: ['Next.js', 'Python', 'WebSocket', 'LLM', 'Google APIs', 'Electron'],
    link: '#',
    year: '2025',
    role: 'Generative AI + Agentic AI + Full Stack',
    codeSnippet: `// Agent Router
class AgentRouter {
  async route(intent: Intent) {
    const agent = this.agents.get(intent.service);
    if (agent.requiresGuardrail(intent)) {
      await this.security.validate(intent);
    }
    return agent.execute(intent.payload);
  }
}`,
    architectureDescription:
      'User Intent → Agent Router → Security Guardrails → Service Agent (Meet/OS/Chat) → Tool Calling → Response Aggregation → WebSocket → UI',
  },
  {
    id: 'talking-bi',
    title: 'Talking BI',
    description:
      'Conversational business intelligence platform. Users ask questions in natural language; the system generates SQL, executes queries, and renders interactive multi-chart dashboards.',
    techStack: ['React', 'Python', 'Groq LLM', 'PostgreSQL', 'Chart.js', 'FastAPI'],
    link: '#',
    year: '2025',
    role: 'Generative AI + Agentic AI + Full Stack',
    codeSnippet: `// Query Intelligence
async function processQuery(nlQuery: string) {
  const intent = classifyIntent(nlQuery);
  if (intent === 'analytical') {
    const sql = await llm.generateSQL(nlQuery, schema);
    const data = await db.execute(sql);
    return generateDashboard(data, nlQuery);
  }
  return generateConversation(nlQuery);
}`,
    architectureDescription:
      'NL Query → Intent Classifier → SQL Generator → Auto-Heal Loop → PostgreSQL → Chart Engine → Multi-Dashboard Renderer',
  },
  {
    id: 'shopintel',
    title: 'ShopIntel',
    description:
      'Real-time retail surveillance analytics platform with dark-themed glassmorphism UI. Processes video feeds for customer behavior tracking and anomaly detection.',
    techStack: ['React', 'Python', 'OpenCV', 'TensorFlow', 'WebSocket', 'Redis'],
    link: '#',
    year: '2024',
    role: 'Deep Learning + Frontend',
    codeSnippet: `// Detection Pipeline
class DetectionPipeline:
    def process_frame(self, frame):
        detections = self.yolo.detect(frame)
        tracks = self.tracker.update(detections)
        anomalies = self.anomaly_engine.check(tracks)
        self.ws.broadcast(tracks, anomalies)`,
    architectureDescription:
      'Camera Feed → Frame Buffer → YOLO Detection → DeepSORT Tracking → Anomaly Engine → WebSocket → React Dashboard',
  },
  {
    id: 'firereach',
    title: 'FireReach',
    description:
      'Automated outreach and engagement platform with modern UI. Manages multi-channel campaigns with intelligent scheduling and performance analytics.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Bull Queue', 'SendGrid', 'Chart.js'],
    link: 'https://fire-reach-aws.vercel.app/',
    year: '2024',
    role: 'Agentic AI + Full Stack',
    codeSnippet: `// Campaign Scheduler
const scheduler = new CampaignScheduler({
  channels: ['email', 'linkedin', 'twitter'],
  rateLimit: { perMinute: 30 },
  retryPolicy: { maxAttempts: 3, backoff: 'exponential' },
  analytics: new AnalyticsEngine()
});`,
    architectureDescription:
      'Campaign Config → Queue Manager → Rate Limiter → Multi-Channel Dispatcher → Delivery Tracking → Analytics Aggregation → Dashboard',
  },
];
