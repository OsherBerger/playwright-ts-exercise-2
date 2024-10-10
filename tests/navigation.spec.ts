import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ApplicationURL, ModalTitles } from '../helpers';
import { ModalComponent } from '../components/Modals';

test('Testing the navigation bar', async ({ page }) => {

    const homePage = new HomePage(page);
    const modal = new ModalComponent(page);
    
    await test.step('Open the homepage and validate URL', async () => {
        await page.goto(ApplicationURL.BASE_URL);
        await homePage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    await test.step('Navigate through the website links', async () => {
        await homePage.navigateTo('home');
        await homePage.validatePageUrl(ApplicationURL.HOME_URL);
        
        await homePage.navigateTo('contact');
        await modal.validateModalTitle(ModalTitles.CONTACT_MODAL);
        await modal.closeModal();
        
        await homePage.navigateTo('aboutUs');
        await modal.validateModalTitle(ModalTitles.ABOUT_US_MODAL);
        await modal.closeModal();    

        await homePage.navigateTo('cart');
        await homePage.validatePageUrl(ApplicationURL.CART_URL);

        await homePage.navigateTo('logIn');
        await modal.validateModalTitle(ModalTitles.LOG_IN_MODAL);
        await modal.closeModal();

        await homePage.navigateTo('signUp');
        await modal.validateModalTitle(ModalTitles.SIGN_UP_MODAL);
        await modal.closeModal();
    });

});
