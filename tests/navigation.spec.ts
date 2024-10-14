import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ApplicationURL, ModalTitles } from '../helpers';
import { ModalComponent } from '../components/Modals';
import { NavigationLinks } from '../helpers';

test('Testing the navigation bar', async ({ page }) => {

    const homePage = new HomePage(page);
    const modal = new ModalComponent(page);

    await test.step('Open the homepage and validate URL', async () => {
        await page.goto(ApplicationURL.BASE_URL);
        await homePage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    for (const link of NavigationLinks) {
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

