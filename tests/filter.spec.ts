import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import ApplicationURL from '../helpers/ApplicationURL';
import { Category } from '../helpers/Enums';

test('Testing the filtering feature', async ({ page }) => {

    const homePage = new HomePage(page);

    await test.step('Open the homepage and validate URL', async () => {
        await page.goto(ApplicationURL.BASE_URL);
        await homePage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    await test.step('Validate product categories', async () => {
        await homePage.validateCategory(Category.Phones);
        await homePage.validateCategory(Category.Laptops);
        await homePage.validateCategory(Category.Monitors);
    });

});
