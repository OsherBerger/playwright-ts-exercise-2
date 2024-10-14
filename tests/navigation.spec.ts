import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ApplicationURL, ModalTitles } from '../helpers';
import { ModalComponent } from '../components/Modals';

test('Testing the navigation bar', async ({ page }) => {

    const homePage = new HomePage(page);
    const modal = new ModalComponent(page);

    const navigationLinks = [
        { name: 'home', expectedUrl: ApplicationURL.HOME_URL, isModal: false },
        { name: 'contact', modalTitle: ModalTitles.CONTACT_MODAL, isModal: true },
        { name: 'aboutUs', modalTitle: ModalTitles.ABOUT_US_MODAL, isModal: true },
        { name: 'cart', expectedUrl: ApplicationURL.CART_URL, isModal: false },
        { name: 'logIn', modalTitle: ModalTitles.LOG_IN_MODAL, isModal: true },
        { name: 'signUp', modalTitle: ModalTitles.SIGN_UP_MODAL, isModal: true }
    ];

    await test.step('Open the homepage and validate URL', async () => {
        await page.goto(ApplicationURL.BASE_URL);
        await homePage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    for (const link of navigationLinks) {
        await test.step(`Navigate to ${link.name}`, async () => {
            await homePage.navigateTo(link.name);

            if (link.isModal) {
                await modal.validateModalTitle(link.modalTitle!);
                await modal.closeModal();
            } else {
                await homePage.validatePageUrl(link.expectedUrl!);
            }
        });
    }
});

