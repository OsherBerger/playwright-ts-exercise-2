import { Locator, Page, expect, test } from "@playwright/test";

export abstract class BasePage {
    constructor(protected page: Page) {}

    public async validatePageUrl(url: string) {
            await expect(this.page).toHaveURL(url)
    }

    public async validateTitle(title: string){
        await this.validateElementText(this.page.locator('[class="modal-title"]').filter({ hasText: title }), title);
    }

    protected async validateElementText(element: Locator, expectedText: string) {
            await expect(element).toContainText(expectedText);
    }

    protected async clickElement(element: Locator){
            await element.click();
    }   

    protected async fillText(element: Locator, textToFill: string){
            await element.fill(textToFill);
    }

}
