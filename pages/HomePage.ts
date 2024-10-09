import { expect, Locator, Page } from "@playwright/test";
import { PhonesList, LaptopsList, MonitorsList } from "../helpers/InventoryList";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    private contactEmailTextField: Locator;
    private contactNameTextField: Locator;
    private messageTextField: Locator;
    private phonesCategory: Locator;
    private laptopsCategory: Locator;
    private monitorsCategory: Locator;
    private homeLink: Locator;
    private contactLink: Locator;
    private aboutUsLink: Locator;
    private cartLink: Locator;
    private logInLink: Locator;
    private signUpLink: Locator;
    private closeButton: Locator;
    private addToCartButton: Locator;
 
    constructor(protected page: Page) {
        super(page);
        this.phonesCategory = this.page.getByRole('link', { name: 'Phones' });
        this.laptopsCategory = this.page.getByRole('link', { name: 'Laptops' });
        this.monitorsCategory = this.page.getByRole('link', { name: 'Monitors' });
        this.homeLink = this.page.getByRole('link', { name: 'Home (current)' });
        this.messageTextField = this.page.locator('[id="message-text"]');
        this.contactEmailTextField = this.page.locator('[id="recipient-email"]');
        this.contactNameTextField = this.page.locator('[id="recipient-name"]');
        this.contactLink = this.page.getByRole('link', { name: 'Contact' });
        this.aboutUsLink = this.page.getByRole('link', { name: 'About us' });
        this.cartLink = this.page.getByRole('link', { name: 'Cart', exact: true });
        this.logInLink = this.page.getByRole('link', { name: 'Log in' });
        this.signUpLink = this.page.getByRole('link', { name: 'Sign up' });
        this.closeButton = this.page.getByRole('button', { name: 'Close' }).nth(1);
        this.addToCartButton = this.page.locator('a.btn.btn-success.btn-lg');
    }
    
    private productsByCategory = {
        'Phones': Object.values(PhonesList),
        'Laptops': Object.values(LaptopsList),
        'Monitors': Object.values(MonitorsList)
    };

    public async validateCategory(category: "Phones" | "Laptops" | "Monitors") {
        await this.clickCategory(category);
        const expectedProducts = await this.productsByCategory[category];

        await this.page.waitForSelector('h4.card-title a');
        const productNames = (await this.page.locator('h4.card-title a').allTextContents());
                
        console.log(`Validating category: ${category}`);
        console.log("Found product names:", productNames); 
        
        for (const expectedProduct of expectedProducts) {
            if (productNames.includes(expectedProduct)) {
                console.log(`Product "${expectedProduct}" found in category "${category}".`);
            } else {
                console.log(`Product "${expectedProduct}" NOT found in category "${category}".`);
            }
        }
    }
    
    public async clickCategory(category: "Phones" | "Laptops" | "Monitors") {
        switch (category) {
            case "Phones":
                await this.clickElement(this.phonesCategory);
                break;
            case "Laptops":
                await this.clickElement(this.laptopsCategory);
                break;
            case "Monitors":
                await this.clickElement(this.monitorsCategory);
                break;
        }
    }

    public async navigateToHome() {
        await this.clickElement(this.homeLink);
    }

    public async ContactForm() {
        await this.clickElement(this.contactLink);
    }

    public async AboutUs() {
        await this.clickElement(this.aboutUsLink);
    }
    
    public async Cart() {
        await this.clickElement(this.cartLink);
    }

    public async Login() {
        await this.clickElement(this.logInLink);
    }
    
    public async SignUp() {
        await this.clickElement(this.signUpLink);
    }
    
    public async closeModal() {
        await this.clickElement(this.closeButton);
    }

    public async fillInformation(details:{contactEmail: string, contactName: string, message: string}) {
        await this.fillText(this.contactEmailTextField, details.contactEmail);
        await this.fillText(this.contactNameTextField, details.contactName);
        await this.fillText(this.messageTextField, details.message);
        await this.validateEmailInput(details.contactEmail)
    }

    public async validateEmailInput(contactEmail: string) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailPattern.test(contactEmail);
        expect(isValidEmail).toBe(true);
        console.log(`Entered email: ${contactEmail}, Is valid: ${isValidEmail}`);
    }
    
    public async messageAndAlert(MessageAlert: string) {
        this.page.once("dialog", async (dialog) => {
            const actualMessage = dialog.message();
            console.log("Expected dialog message:", MessageAlert);
            console.log("Received dialog message:", actualMessage);
            expect(actualMessage).toBe(MessageAlert);
            await dialog.accept();
        });
        await this.clickElement(this.page.getByLabel("New message").getByText("Send message"));
        await this.page.waitForSelector(".modal-open", { state: "hidden" });
    }

    public async chooseItem(itemName: string) {
        await this.clickElement(this.page.getByText(itemName)); 
    }

    public async AddAndAlert(AddAlert: string) {        
        this.page.once("dialog", async (dialog) => {
            const output = dialog.message();
            console.log("Expected dialog message:", AddAlert);
            console.log("Received dialog message:", output);
            expect(output).toBe(AddAlert);
            await dialog.accept();
        });
    
        await this.clickElement(this.addToCartButton);
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(".modal-open", { state: "hidden" });
    }
    
}
