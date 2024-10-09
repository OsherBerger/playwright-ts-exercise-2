import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import ApplicationURL from '../../helpers/ApplicationURL';

test('Test the filtering feature', async ({ page }) => {

    const homePage = new HomePage(page);

    await page.goto(ApplicationURL.BASE_URL);
    await homePage.validatePageUrl(ApplicationURL.BASE_URL);

    // Validate category filters and ensure only correct products are shown
    await homePage.validateCategory("Phones");
    await homePage.navigateToHome();//added as timeout because of internet speed
    await homePage.validateCategory("Laptops");
    await homePage.navigateToHome();//added as timeout because of internet speed
    await homePage.validateCategory("Monitors");

});
