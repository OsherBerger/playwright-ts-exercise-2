import { Locator, Page, expect } from "@playwright/test";

export abstract class BasePage {
    constructor(protected page: Page) {}

    public async validatePageUrl(url: string) {
            await expect(this.page).toHaveURL(url)
            console.log(`This ${url} page URL  is correct`)
    }

    public async validateTitle(title: string){
        await this.validateElementText(this.page.locator('[class="modal-title"]').filter({ hasText: title }), title);
        console.log(`This ${title} modal title  is correct`)
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
