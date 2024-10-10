import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/Base/BasePage";

export class ModalComponent extends BasePage {

    private closeButton: Locator;    

    constructor(protected page: Page) {
        super(page);
        this.closeButton = this.page.getByRole('button', { name: 'Close' }).nth(1);
    }

    public async validateModalTitle(title: string){
            await this.validateElementText(this.page.locator('[class="modal-title"]').filter({ hasText: title }), title);
            console.log(`Validated modal title: ${title}`);
        }

    public async closeModal() {
        await this.clickElement(this.closeButton);
    }
}
