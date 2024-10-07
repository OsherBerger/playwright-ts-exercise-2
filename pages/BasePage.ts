import { Locator, Page } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) {}

    // Click an element
    protected async clickElement(element: Locator) {
        await element.click();
    }   

    // Fill text in an input field
    protected async fillText(element: Locator, text: string) {
        await element.fill(text);
    }

    // Accept or dismiss any dialogs
    public async handleDialog(dialogAction: 'accept' | 'dismiss' = 'dismiss') {
        this.page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            if (dialogAction === 'accept') await dialog.accept();
            else await dialog.dismiss();
        });
    }
}
