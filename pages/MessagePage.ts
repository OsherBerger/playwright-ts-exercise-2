import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export  class MessagePage extends BasePage {

    private contactEmailTextField: Locator;
    private contactNameTextField: Locator;
    private messageTextField: Locator;

    constructor(protected page: Page) {
        super(page);
        this.contactEmailTextField = this.page.locator('[id="recipient-email"]');
        this.contactNameTextField = this.page.locator('[id="recipient-name"]');
        this.messageTextField = this.page.locator('[id="message-text"]');
    }

    public async fillInformation(details:{contactEmail: string, contactName: string, message: string}) {
        await this.fillText(this.contactEmailTextField, details.contactEmail);
        await this.fillText(this.contactNameTextField, details.contactName);
        await this.fillText(this.messageTextField, details.message);
    }

    public async sendMessage(){
        const sendMessageButton = this.page.getByRole('button', { name: 'Send message' });
        await sendMessageButton.click();
    }

}