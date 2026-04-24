<script setup lang="ts">
import { computed, ref } from 'vue';

const filter = ref('All');

type P = {
  id: string;
  year: string;
  title: string;
  kind: string;
  client: string;
  desc: string;
  tags: string[];
  cats: string[];
  link: boolean;
  linkTo: string;
};

const projects: P[] = [
  {
    id: 'sulus',
    year: '2023—26',
    title: 'Sulus.ai',
    kind: 'Platform architecture · AI voice',
    client: 'Lighthouse Graphics',
    desc: 'Multi-tenant SaaS for AI voice agents. Resellers brand their own tenants; each tenant spins up voice assistants configured in plain English.',
    tags: ['Laravel', 'Vue.js', 'Supabase', 'Pinecone', 'GHL', 'n8n'],
    cats: ['Platform', 'AI / Voice'],
    link: true,
    linkTo: '/work/sulus',
  },
  {
    id: 'edp',
    year: '2019—23',
    title: 'eDP — Defense Procurement',
    kind: 'Government platform',
    client: 'Bangladesh Ministry of Defense (DGDP)',
    desc: 'A multi-module procurement platform — tenders, bidders, contracts, audit — running on Spring Boot microservices, Oracle, and React. High-security, multi-role workflows.',
    tags: ['Java', 'Spring Boot', 'React', 'Oracle', 'Redis'],
    cats: ['Platform', 'Government'],
    link: true,
    linkTo: '/work/edp',
  },
  {
    id: 'hive',
    year: '2024',
    title: 'The Hive',
    kind: 'Internal AI operations',
    client: 'Lighthouse Graphics',
    desc: 'Meeting summaries, action-item extraction, scope docs — all auto-generated and threaded back into Slack, ClickUp, and GHL. Yelp-webhook leads answered autonomously by an AI agent.',
    tags: ['Laravel', 'NestJS', 'React', 'OpenAI', 'Slack', 'Yelp'],
    cats: ['Platform', 'AI / Voice'],
    link: true,
    linkTo: '/work/hive',
  },
  {
    id: 'learnwithai',
    year: '2025',
    title: 'LearnWithAI.BD',
    kind: 'Personal SaaS',
    client: 'Self-initiated',
    desc: 'A Bangla-first AI programming mentor aimed at Bangladeshi developers. Waitlist beta is live — Claude drives the tutor loop.',
    tags: ['Laravel', 'Vue', 'Inertia', 'Claude API'],
    cats: ['Personal', 'AI / Voice'],
    link: true,
    linkTo: '/work/learnwithai',
  },
  {
    id: 'aalap',
    year: '2024',
    title: 'AalapAI',
    kind: 'Personal SaaS',
    client: 'Self-initiated',
    desc: 'Bridges WhatsApp Business numbers to AI agents so small businesses can automate customer conversations on the channel they already use.',
    tags: ['Laravel', 'MySQL', 'OpenAI'],
    cats: ['Personal', 'AI / Voice'],
    link: true,
    linkTo: '/work/aalap',
  },
  {
    id: 'dss',
    year: '2022',
    title: 'DSS HRMS',
    kind: 'Enterprise HR',
    client: 'SIMEC System Ltd.',
    desc: 'Full HR suite — payroll, attendance, leave, and loan modules — for distributed South Asian employers.',
    tags: ['Laravel', 'Angular', 'MySQL'],
    cats: ['Platform', 'Government'],
    link: true,
    linkTo: '/work/dss',
  },
];

const oss = [
  { name: 'laravel-n8n-mcp-server', desc: '54-tool MCP server bridging Laravel & n8n workflows', stars: '214' },
  { name: 'laravel-quickbooks-mcp-server', desc: '49-tool QuickBooks MCP — OAuth 2.0, multi-tenant', stars: '138' },
  { name: 'laravel-notion-mcp-server', desc: 'Notion integration via Laravel', stars: '72' },
  { name: 'Larastreamer', desc: 'Laravel video streaming package', stars: '51' },
  { name: 'Laravel-EWS-Mail-Server', desc: 'Email via Exchange Web Server', stars: '28' },
  { name: 'GHL WP Bridge', desc: 'WordPress GoHighLevel plugin', stars: '17' },
];

const filters = ['All', 'Platform', 'AI / Voice', 'Government', 'Personal', 'Open source'] as const;

const showProjects = computed(() => filter.value !== 'Open source');
const showOss = computed(() => filter.value === 'All' || filter.value === 'Open source');
const visibleProjects = computed(() => {
  const f = filter.value;
  if (f === 'All' || f === 'Open source') return projects;
  return projects.filter((p) => p.cats.includes(f));
});

const countLabel = computed(() => {
  const f = filter.value;
  if (f === 'All') return `${projects.length} projects · ${oss.length} repos`;
  if (f === 'Open source') return `${oss.length} repos`;
  return `${visibleProjects.value.length} of ${projects.length}`;
});
</script>

<template>
  <div
    class="work-filters"
    style="border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); padding: 12px 40px; background: var(--paper-2)"
  >
    <div
      class="content"
      style="padding: 0; display: flex; gap: 10px; align-items: center; font-size: 11px; color: var(--muted); flex-wrap: wrap"
    >
      <span
        class="eyebrow"
        style="margin-right: 8px"
        >Filter</span
      >
      <span
        v-for="f in filters"
        :key="f"
        class="chip"
        :style="{
          cursor: 'pointer',
          userSelect: 'none',
          background: f === filter ? 'var(--ink)' : 'transparent',
          color: f === filter ? 'var(--paper)' : 'var(--ink-soft)',
          borderColor: f === filter ? 'var(--ink)' : 'var(--rule)',
          transition: 'all .15s',
        }"
        role="button"
        tabindex="0"
        @click="filter = f"
        @keydown.enter="filter = f"
      >{{ f }}</span>
      <span style="margin-left: auto; font-family: var(--mono)">
        <span style="color: var(--accent)">◆</span>
        &nbsp;{{ countLabel }}
      </span>
    </div>
  </div>

  <div
    v-if="showProjects"
    class="content"
    style="padding: 40px 40px 20px"
  >
    <div
      v-if="visibleProjects.length === 0"
      style="
        padding: 60px 0;
        text-align: center;
        border: 1px dashed var(--rule);
        color: var(--muted);
        font-family: var(--mono);
        font-size: 12px;
      "
    >
      <div
        style="font-size: 28px; font-family: var(--display); font-style: italic; color: var(--ink-soft); margin-bottom: 10px"
      >
        Nothing under “{{ filter }}.”
      </div>
      <div>
        Try another category, or
        <button
          type="button"
          class="text-btn"
          @click="filter = 'All'"
        >
          show everything
        </button>.
      </div>
    </div>
    <div
      v-else
      class="work-rows"
    >
      <a
        v-for="(p, i) in visibleProjects"
        v-show="p.link"
        :key="p.id"
        :href="p.linkTo"
        class="work-row"
        :class="{ 'work-row--last': i === visibleProjects.length - 1 }"
      >
        <div class="work-row__i">{{ String(i + 1).padStart(2, '0') }}</div>
        <div>
          <div class="work-row__year">{{ p.year }}</div>
          <div class="work-row__kind">
            {{ p.kind.split('·')[0].trim() }}
          </div>
        </div>
        <div>
          <div class="work-row__titleline">
            <div class="display work-row__title">
              {{ p.title }}
            </div>
            <span
              v-if="p.link"
              class="stamp"
              style="font-size: 9px; padding: 2px 8px; transform: rotate(-3deg)"
            >case study</span>
          </div>
          <div class="work-row__client">for {{ p.client }}</div>
          <div class="work-row__desc">
            {{ p.desc }}
          </div>
          <div class="work-row__tags">
            <span
              v-for="t in p.tags"
              :key="t"
              class="chip"
            >{{ t }}</span>
          </div>
        </div>
        <div class="work-row__status">available</div>
      </a>
    </div>
  </div>

  <div
    v-if="showOss"
    class="content"
    style="padding: 48px 40px 20px"
  >
    <div class="section-head">
      <span class="num">§ 02</span>
      <span class="title">Open source</span>
      <span class="rest" />
      <span style="font-size: 11px; color: var(--muted); white-space: nowrap">github.com/rajurayhan</span>
    </div>
    <div class="grid grid-2">
      <div
        v-for="o in oss"
        :key="o.name"
        class="project-card"
        style="padding: 18px 22px; cursor: default"
      >
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px">
          <div style="font-family: var(--mono); font-size: 14px; font-weight: 600; color: var(--ink)">
            {{ o.name }}
          </div>
          <div style="font-size: 11px; color: var(--muted)">
            <span style="color: var(--accent)">★</span>
            {{ o.stars }}
          </div>
        </div>
        <div style="font-size: 12.5px; color: var(--ink-soft); line-height: 1.55">
          {{ o.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-btn {
  color: var(--accent);
  cursor: pointer;
  text-decoration: underline;
  background: none;
  border: 0;
  font: inherit;
  padding: 0;
}
.work-row {
  display: grid;
  grid-template-columns: 60px 130px 1fr 110px;
  gap: 24px;
  padding: 28px 0;
  border-bottom: 1px solid var(--rule);
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
  align-items: start;
  cursor: pointer;
}
.work-row--last {
  border-bottom: none;
}
.work-row:hover {
  background: var(--paper-2);
}
.work-row__i {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--muted);
  padding-top: 6px;
}
.work-row__year {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
}
.work-row__kind {
  font-size: 10.5px;
  color: var(--accent);
  margin-top: 4px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.work-row__titleline {
  display: flex;
  align-items: baseline;
  gap: 14px;
}
.work-row__title {
  font-size: clamp(22px, 5.5vw, 32px);
  color: var(--ink);
}
.work-row__client {
  font-size: 11.5px;
  color: var(--muted);
  margin-top: 2px;
  margin-bottom: 10px;
}
.work-row__desc {
  font-size: 12.5px;
  color: var(--ink-soft);
  line-height: 1.6;
  max-width: 620px;
}
.work-row__tags {
  display: flex;
  gap: 6px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.work-row__status {
  text-align: right;
  padding-top: 6px;
  font-size: 11px;
  color: var(--muted);
  transition: color 0.15s;
}
.work-row:hover .work-row__status {
  color: var(--accent);
}
@media (max-width: 900px) {
  .work-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .work-row__status {
    text-align: left;
  }
}
</style>
