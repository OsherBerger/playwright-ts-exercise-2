import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import ApplicationURL from '../../helpers/ApplicationURL';
import { ModalTitles } from '../../helpers/ModalTitles';

test('Test the contact feature', async ({ page }) => {

    const homePage = new HomePage(page);
    
    await page.goto(ApplicationURL.BASE_URL);
    await homePage.validatePageUrl(ApplicationURL.BASE_URL);

    //Sending a message
    await homePage.ContactForm();
    await homePage.validateTitle(ModalTitles.CONTACT_MODAL);
    await homePage.fillInformation({
        contactEmail:'osherberger@gmail.com',
        contactName: 'Osher Berger',
        message: 'Hello World'
    });
    await homePage.messageAndAlert('Thanks for the message!!');
});
