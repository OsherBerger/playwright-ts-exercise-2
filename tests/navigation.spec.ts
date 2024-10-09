import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import ApplicationURL from '../../helpers/ApplicationURL';
import { ModalTitles } from '../../helpers/ModalTitles';

test('Testing the navigation bar', async ({ page }) => {

    const homePage = new HomePage(page);
    
    await test.step('Open the homepage and validate URL', async () => {
        await page.goto(ApplicationURL.BASE_URL);
        await homePage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    await test.step('Navigate through the website links', async () => {
        await homePage.navigateToHome();
        await homePage.validatePageUrl(ApplicationURL.HOME_URL);
        
        
        await homePage.ContactForm();
        await homePage.validateTitle(ModalTitles.CONTACT_MODAL);
        await homePage.closeModal();
        
        await homePage.AboutUs();
        await homePage.validateTitle(ModalTitles.ABOUT_US_MODAL);
        await homePage.closeModal();    

        await homePage.Cart();
        await homePage.validatePageUrl(ApplicationURL.CART_URL);

        await homePage.Login();
        await homePage.validateTitle(ModalTitles.LOG_IN_MODAL);
        await homePage.closeModal();

        await homePage.SignUp();
        await homePage.validateTitle(ModalTitles.SIGN_UP_MODAL);
        await homePage.closeModal();
    });

});
