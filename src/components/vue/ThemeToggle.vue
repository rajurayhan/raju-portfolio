<script setup lang="ts">
import { ref } from 'vue';

const STORAGE = 'raju-theme';

/** Same logic as `<head>` inline in PortfolioLayout — must not default to Day and then correct in onMounted (full page nav would flash). */
function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  try {
    const s = localStorage.getItem(STORAGE);
    if (s === 'light' || s === 'dark') return s;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

const theme = ref<'light' | 'dark'>(getInitialTheme());

function setTheme(next: 'light' | 'dark') {
  theme.value = next;
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem(STORAGE, next);
  } catch {
    /* private mode */
  }
}
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
