import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export  class MessagePage extends BasePage {

    private contactEmailTextField: Locator;
    private contantNameTextField: Locator;
    private messageTextField: Locator;

    constructor(protected page: Page) {
        super(page);
        this.contactEmailTextField = this.page.locator('[id="recipient-email"]');
        this.contantNameTextField = this.page.locator('[id="recipient-name"]');
        this.messageTextField = this.page.locator('[id="message-text"]');
    }

    public async fillInformation(contactEmail: string, contactName: string, message: string) {
        await this.fillText(this.contactEmailTextField, contactEmail);
        await this.fillText(this.contantNameTextField, contactName);
        await this.fillText(this.messageTextField, message);
    }

    public async sendMessage(){
        const sendMessageButton = this.page.getByRole('button', { name: 'Send message' });
        await sendMessageButton.click();
    }


}