import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html'], 
    ['allure-playwright']
  ], 
  use: {

    // trace: 'on-first-retry',
    trace: 'on',

    screenshot: 'on',

    // video: 'on-first-retry',
    video: 'on',

    headless: process.env.CI ? true : false,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],

});
