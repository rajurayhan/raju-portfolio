export type EcosystemSystem = {
  id: string;
  name: string;
  tagline: string;
  tags: string[];
  url?: string;
};

/** Systems built for the Sulus.ai product ecosystem */
export const SULUS_ECOSYSTEM: EcosystemSystem[] = [
  {
    id: 'platform',
    name: 'Sulus.ai',
    tagline: 'White-label, multi-tenant SaaS for AI voice agents — resellers, Pinecone KB, n8n orchestration.',
    tags: ['Laravel', 'Vue', 'Pinecone', 'Pipecat'],
    url: 'https://sulus.ai',
  },
  {
    id: 'sulus-mcp',
    name: 'Sulus MCP',
    tagline:
      'Hosted MCP infrastructure — connector catalog, OAuth & API keys, workspace-scoped endpoints, no-code tool builder.',
    tags: ['MCP', 'OAuth', 'Connectors', 'Streamable HTTP'],
    url: 'https://mcp.sulus.ai',
  },
  {
    id: 'agents',
    name: 'Sulus Agents',
    tagline: 'MCP-native agent platform — connectors, file-backed context, OpenAI-compatible chat API.',
    tags: ['MCP', 'Claude', 'OpenAI', 'Connectors'],
  },
  {
    id: 'pins',
    name: 'SulusPins',
    tagline: 'Visual feedback & bug-reporting — embeddable widget SDK, triage dashboard, MCP surface.',
    tags: ['Widget SDK', 'REST', 'MCP'],
  },
  {
    id: 'n8n-mcp',
    name: 'n8n Admin MCP',
    tagline: 'Internal n8n ops MCP over automations.sulus.ai — workflow CRUD, webhooks, security audits.',
    tags: ['n8n', 'MCP', 'Automation'],
  },
  {
    id: 'payroll',
    name: 'Kimai Payroll',
    tagline: 'Biweekly payroll plugin — timesheet approvals, team-lead & finance queues, project budgets.',
    tags: ['Kimai', 'PHP', 'Payroll'],
  },
  {
    id: 'hive',
    name: 'The Hive',
    tagline: 'Internal ops — meeting summaries, Yelp lead response, scope generation across Slack & ClickUp.',
    tags: ['NestJS', 'Laravel', 'OpenAI'],
  },
  {
    id: 'oss-mcp',
    name: 'Open-source MCP bridges',
    tagline: 'Published Laravel MCP packages for n8n, QuickBooks, and Notion — used in production and OSS.',
    tags: ['Laravel', 'MCP', 'n8n', 'QuickBooks'],
  },
];
