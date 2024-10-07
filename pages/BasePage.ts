import { Locator, Page, expect, test } from "@playwright/test";

export abstract class BasePage {
    constructor(protected page: Page) {}

    public async validatePageUrl(url: string) {
        await test.step(`Validating that a correct value of URL is${url}`, async () => {
            await expect(this.page).toHaveURL(url)
        })
    }

    protected async clickElement(element: Locator) {
        await element.click();
    }   

    protected async fillText(element: Locator, text: string) {
        await element.fill(text);
    }

}
