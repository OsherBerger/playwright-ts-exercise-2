import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/Base/BasePage";

export class FormComponent extends BasePage {
    constructor(protected page: Page) {
        super(page);
    }

    public async fillFormField(field: Locator, value: string) {
        await this.fillText(field, value);
    }

    public async validateEmailField(field: Locator, email: string) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailPattern.test(email);
        expect(isValidEmail).toBe(true);
        console.log(`Entered email: ${email}, Is valid: ${isValidEmail}`);
    }
}
