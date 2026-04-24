import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: {
    baseURL: 'https://practice.expandtesting.com/notes/api/',
    trace: 'on-first-retry',
  },
});