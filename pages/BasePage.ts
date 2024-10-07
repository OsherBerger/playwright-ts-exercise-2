import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
    constructor(protected page: Page) {}

    // Click an element
    protected async clickElement(element: Locator) {
        await element.click();
    }   

    // Fill text in an input field
    protected async fillText(element: Locator, text: string) {
        await element.fill(text);
    }

}
