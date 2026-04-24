<script setup lang="ts">
import { ref } from 'vue';

const sent = ref(false);
const busy = ref(false);
const err = ref('');
const form = ref({
  name: '',
  email: '',
  company: '',
  budget: 'not-sure',
  engagement: 'fractional',
  message: '',
});

async function onSubmit(e: Event) {
  e.preventDefault();
  err.value = '';
  busy.value = true;
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      err.value = data.error || 'Something went wrong. Try email instead.';
      return;
    }
    sent.value = true;
  } catch {
    err.value = 'Network error. Try again or email directly.';
  } finally {
    busy.value = false;
  }
}

function reset() {
  sent.value = false;
  form.value = { name: '', email: '', company: '', budget: 'not-sure', engagement: 'fractional', message: '' };
  err.value = '';
}
</script>

<template>
  <div v-if="!sent">
    <div style="border: 1px solid var(--rule); background: var(--paper-2); padding: 32px">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 8px">
        <div class="eyebrow">/form/new-engagement.md</div>
        <div style="font-size: 10.5px; color: var(--muted); font-family: var(--mono)">
          <span
            class="status-dot"
            style="display: inline-block; margin-right: 6px; vertical-align: middle"
          />
          via Resend · TLS
        </div>
      </div>
      <p
        v-if="err"
        style="color: #c24; font-size: 12px; margin-bottom: 12px; font-family: var(--mono)"
      >
        {{ err }}
      </p>
      <form @submit="onSubmit">
        <div class="form-field">
          <label for="cf-name">Name</label>
          <input
            id="cf-name"
            v-model="form.name"
            name="name"
            required
            placeholder="Your name"
            autocomplete="name"
          />
        </div>
        <div class="form-field">
          <label for="cf-email">Email</label>
          <input
            id="cf-email"
            v-model="form.email"
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            autocomplete="email"
          />
        </div>
        <div class="form-field">
          <label for="cf-company">Company (optional)</label>
          <input
            id="cf-company"
            v-model="form.company"
            name="company"
            placeholder="Where you're writing from"
            autocomplete="organization"
          />
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px" class="cf-grid-2">
          <div class="form-field">
            <label for="cf-eng">Engagement</label>
            <select
              id="cf-eng"
              v-model="form.engagement"
              name="engagement"
            >
              <option value="fractional">Fractional Head of Eng</option>
              <option value="advisory">Architecture advisory</option>
              <option value="build">Project build</option>
              <option value="review">Platform / code review</option>
              <option value="other">Something else</option>
            </select>
          </div>
          <div class="form-field">
            <label for="cf-budget">Budget range</label>
            <select
              id="cf-budget"
              v-model="form.budget"
              name="budget"
            >
              <option value="not-sure">Not sure yet</option>
              <option value="under-10k">Under $10k</option>
              <option value="10-25k">$10k — $25k / mo</option>
              <option value="25k-plus">$25k+ / mo</option>
              <option value="retainer">Ongoing retainer</option>
            </select>
          </div>
        </div>
        <div class="form-field">
          <label for="cf-msg">The situation</label>
          <textarea
            id="cf-msg"
            v-model="form.message"
            name="message"
            required
            placeholder="What are you building? What's getting in the way?"
          />
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; flex-wrap: wrap; gap: 8px">
          <div style="font-size: 11px; color: var(--muted)">
            <span
              class="prompt"
              style="font-size: 11px"
            >send --carefully</span>
          </div>
          <button
            type="submit"
            class="btn"
            :disabled="busy"
          >
            {{ busy ? 'Sending…' : 'Send message →' }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    v-else
    style="border: 1px solid var(--ink); background: var(--paper); padding: 48px; text-align: center"
  >
    <div style="font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: 0.12em; margin-bottom: 20px">
      ✓ MESSAGE SENT
    </div>
    <div
      class="display"
      style="font-size: 44px; margin-bottom: 16px"
    >
      Thanks, <span style="font-style: italic">{{ form.name || 'friend' }}</span>.
    </div>
    <div
      style="font-family: var(--serif); font-style: italic; font-size: 18px; color: var(--ink-soft); margin-bottom: 28px; line-height: 1.5"
    >
      I'll read it this evening over tea and write back from
      <br />
      <span style="color: var(--accent)">send2raju.bd@gmail.com</span> within two working days.
    </div>
    <div
      class="term"
      style="text-align: left; font-size: 11.5px"
    >
      <div><span class="c-prompt">raju@studio</span>:~$ mail --queue</div>
      <div class="c-ok">✓ 1 message logged · from: {{ form.email || 'you' }}</div>
      <div class="c-comment">// check inbox for a copy of your note</div>
    </div>
    <button
      type="button"
      class="btn ghost"
      style="margin-top: 24px"
      @click="reset"
    >
      Send another
    </button>
  </div>
  <div style="margin-top: 20px; display: flex; gap: 14px; font-size: 11px; color: var(--muted); flex-wrap: wrap">
    <span>◆ reply window: &lt; 48h</span>
    <span>◆ working hours: 10 — 19 UTC+6</span>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  .cf-grid-2 {
    grid-template-columns: 1fr !important;
  }
}
</style>
