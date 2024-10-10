import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ApplicationURL, ModalTitles, Alert } from '../helpers';

test('Testing the contact feature', async ({ page }) => {

    const homePage = new HomePage(page);
    
    await test.step('Open the homepage and validate URL', async () => {
        await page.goto(ApplicationURL.BASE_URL);
        await homePage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    await test.step('Send a contact message', async () => {
        await homePage.ContactForm();
        await homePage.validateTitle(ModalTitles.CONTACT_MODAL);
        await homePage.fillInformation({
            contactEmail: 'osherberger@gmail.com',
            contactName: 'Osher Berger',
            message: 'Hello World'
        });
        await homePage.messageAndAlert(Alert.Contact);
    });

});
