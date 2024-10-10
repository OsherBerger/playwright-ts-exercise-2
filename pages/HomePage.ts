import { expect, Locator, Page } from "@playwright/test";
import { PhonesList, LaptopsList, MonitorsList } from "../helpers/constants/InventoryList";
import { BasePage } from "./BasePage";
import { Category } from "../helpers/enums/Category";


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

    public async validateCategory(category: Category) {
        await this.clickCategory(category);
        await this.page.waitForTimeout(500)
        await this.page.waitForSelector('h4.card-title a');

        const expectedProducts = await this.productsByCategory[category];

        const productNames = (await this.page.locator('h4.card-title a')
            .allTextContents())
            .map(productName => productName.trim());
                
        console.log(`Validating category: ${category}`);
        console.log("Found product names:", productNames); 
        
        for (const expectedProduct of expectedProducts.map(product => product.trim())) {
            if (productNames.includes(expectedProduct)) {
                console.log('\x1b[36m%s\x1b[0m', `Product "${expectedProduct}" found in category "${category}".`);
            } else {
                console.log('\x1b[31m\x1b[1m%s\x1b[0m', `Product "${expectedProduct}" NOT found in category "${category}".`);
            }
        }
    }
    
    public async clickCategory(category: Category) {
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
    
    public async chooseItem(itemName: string) {
        const item = this.page.locator(`.card-title >> text=${itemName}`);
        await this.clickElement(item); 
    }
    
    public async clickAndValidateAlert(clickElement: Locator, expectedAlertMessage: string) {
        this.page.once("dialog", async (dialog) => {
            const actualMessage = dialog.message();
            console.log("Expected dialog message:", expectedAlertMessage);
            console.log("Received dialog message:", actualMessage);
            expect(actualMessage).toBe(expectedAlertMessage);
            await dialog.accept();
        });
    
        await this.clickElement(clickElement);
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(".modal-open", { state: "hidden" });
    }

    public async messageAndAlert(MessageAlert: string) {
        const sendMessageButton = this.page.getByLabel("New message").getByText("Send message");
        await this.clickAndValidateAlert(sendMessageButton, MessageAlert);
    }

    public async AddAndAlert(AddAlert: string) {
        await this.clickAndValidateAlert(this.addToCartButton, AddAlert);
    }
    
}
