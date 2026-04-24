<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const STORAGE = 'raju-theme';

/**
 * What the user actually sees: `<html data-theme>`, set by the inline
 * script in `PortfolioLayout` before paint. That must match the buttons,
 * including on `/` and after client navigations in dev.
 */
function readDocumentTheme(): 'light' | 'dark' | null {
  if (typeof document === 'undefined') return null;
  const a = document.documentElement.getAttribute('data-theme');
  if (a === 'dark' || a === 'light') return a;
  return null;
}

function readStoredTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  try {
    const s = localStorage.getItem(STORAGE);
    if (s === 'light' || s === 'dark') return s;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function getInitialTheme(): 'light' | 'dark' {
  return readDocumentTheme() ?? readStoredTheme();
}

const theme = ref<'light' | 'dark'>(getInitialTheme());

function applyTheme(next: 'light' | 'dark') {
  theme.value = next;
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem(STORAGE, next);
  } catch {
    /* private mode */
  }
}

function setTheme(next: 'light' | 'dark') {
  applyTheme(next);
}

function syncUIFromDocument() {
  const d = readDocumentTheme();
  if (d) {
    if (d !== theme.value) theme.value = d;
  } else {
    applyTheme(readStoredTheme());
  }
}

declare global {
  interface Window {
    __rajuApplyTheme?: () => string;
  }
}

function onPageShow(e: PageTransitionEvent) {
  if (!e.persisted) return;
  if (window.__rajuApplyTheme) {
    window.__rajuApplyTheme();
  } else {
    try {
      const t = readStoredTheme();
      document.documentElement.setAttribute('data-theme', t);
    } catch {
      /* noop */
    }
  }
  syncUIFromDocument();
}

function onStorage(e: StorageEvent) {
  if (e.key !== STORAGE || !e.newValue) return;
  const v = e.newValue;
  if (v === 'light' || v === 'dark') applyTheme(v);
}

onMounted(() => {
  // Re-sync: head script on every full load; fixes dev/HMR or any island ordering gap.
  syncUIFromDocument();
  window.addEventListener('pageshow', onPageShow);
  window.addEventListener('storage', onStorage);
});

onUnmounted(() => {
  window.removeEventListener('pageshow', onPageShow);
  window.removeEventListener('storage', onStorage);
});
</script>

<template>
  <div
    class="theme-toggle"
    role="group"
    aria-label="Color mode"
  >
    <button
      type="button"
      :class="{ on: theme === 'light' }"
      @click="setTheme('light')"
    >
      Day
    </button>
    <button
      type="button"
      :class="{ on: theme === 'dark' }"
      @click="setTheme('dark')"
    >
      Night
    </button>
  </div>
</template>
