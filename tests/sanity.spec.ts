import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/');
  await page.getByRole('link', { name: 'Phones' }).click();
  await page.getByRole('link', { name: 'Laptops' }).click();
  await page.getByRole('link', { name: 'Monitors' }).click();
  await page.getByRole('link', { name: 'Home (current)' }).click();
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByLabel('New message').getByLabel('Close').click();
  await page.getByRole('link', { name: 'About us' }).click();
  await page.locator('#videoModal').getByLabel('Close').click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('dialog', { name: 'Log in' }).getByLabel('Close').click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByLabel('Sign up').getByLabel('Close').click();
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.locator('#recipient-email').fill('1');
  await page.getByLabel('Contact Email:').fill('1');
  await page.getByLabel('Message:').fill('1');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Send message' }).click();
  await page.getByRole('link', { name: 'Home (current)' }).click();
  await page.locator('.card > a').first().click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByLabel('Total:').fill('1');
  await page.getByLabel('Country:').fill('1');
  await page.getByLabel('City:').fill('1');
  await page.getByLabel('Credit card:').fill('1');
  await page.getByLabel('Month:').fill('1');
  await page.getByLabel('Year:').fill('1');
  await page.getByRole('button', { name: 'Purchase' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});