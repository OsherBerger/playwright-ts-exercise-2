import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import ApplicationURL from '../../helpers/ApplicationURL';

test('Testing the filtering feature', async ({ page }) => {

    const homePage = new HomePage(page);

    await page.goto(ApplicationURL.BASE_URL);
    await homePage.validatePageUrl(ApplicationURL.BASE_URL);

    await homePage.validateCategory("Phones");
    await homePage.navigateToHome();//added as timeout because of internet speed
    await homePage.validateCategory("Laptops");
    await homePage.navigateToHome();//added as timeout because of internet speed
    await homePage.validateCategory("Monitors");

});
