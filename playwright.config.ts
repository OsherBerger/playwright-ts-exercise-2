import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [
    ['list'],
    ['html'], 
    ['allure-playwright']
  ], 
  use: {

    trace: 'on-first-retry',

    screenshot: 'on',

    video: 'on-first-retry',

    headless: process.env.CI ? true : false,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],

});
