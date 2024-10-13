import { expect, Locator, Page } from "@playwright/test";
import { PhonesList, LaptopsList, MonitorsList } from "../helpers/constants/InventoryList";
import { BasePage } from "./Base/BasePage";
import { Category } from "../helpers/enums/Category";
import { FormComponent } from "../components/Forms";

export class HomePage extends BasePage {

    private contactEmailTextField: Locator;
    private contactNameTextField: Locator;
    private messageTextField: Locator;
    
    
    private addToCartButton: Locator;
    private form: FormComponent;

    private categoryLinks: Record<Category, Locator>;
    private actionLinks: Record<string, Locator>;
 
    constructor(protected page: Page) {
        super(page);
        this.form = new FormComponent(page);
        
        this.messageTextField = this.page.locator('[id="message-text"]');
        this.contactEmailTextField = this.page.locator('[id="recipient-email"]');
        this.contactNameTextField = this.page.locator('[id="recipient-name"]');
        
        this.categoryLinks = {
            Phones: this.page.getByRole('link', { name: 'Phones' }),
            Laptops: this.page.getByRole('link', { name: 'Laptops' }),
            Monitors: this.page.getByRole('link', { name: 'Monitors' })
        };

        this.actionLinks = {
            home: this.page.getByRole('link', { name: 'Home (current)' }),
            contact: this.page.getByRole('link', { name: 'Contact' }),
            aboutUs: this.page.getByRole('link', { name: 'About us' }),
            cart: this.page.getByRole('link', { name: 'Cart', exact: true }),
            logIn: this.page.getByRole('link', { name: 'Log in' }),
            signUp: this.page.getByRole('link', { name: 'Sign up' }),
        };
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
        await this.page.waitForSelector('h4.card-title a',{ state: 'visible' });


        const expectedProducts = await this.productsByCategory[category];

        const productNames = (await this.page.locator('h4.card-title a')
            .allTextContents())
            .map(productName => productName.trim());
                
        console.log(`Validating category: ${category}`);
        console.log("Found product names:", productNames); 
        
        for (const expectedProduct of expectedProducts.map(product => product.trim())) {
            expect(productNames).toContain(expectedProduct);
            if (productNames.includes(expectedProduct)) {
                console.log('\x1b[36m%s\x1b[0m', `Product "${expectedProduct}" found in category "${category}".`);
            } else {
                console.log('\x1b[31m\x1b[1m%s\x1b[0m', `Product "${expectedProduct}" NOT found in category "${category}".`);
            }
        }
    }
    
    public async clickCategory(category: Category) {
        await this.clickElement(this.categoryLinks[category]);
    }

    public async navigateTo(link: keyof typeof this.actionLinks) {
        await this.clickElement(this.actionLinks[link]);
    }

    public async fillContactForm(details: { contactEmail: string, contactName: string, message: string }) {
        await this.form.fillFormField(this.contactEmailTextField, details.contactEmail);
        await this.form.fillFormField(this.contactNameTextField, details.contactName);
        await this.form.fillFormField(this.messageTextField, details.message);
        await this.form.validateEmailField(this.contactEmailTextField, details.contactEmail);
    }

    public async chooseItem(itemName: string) {
        const item = this.page.locator(`.card-title >> text=${itemName}`);
        await item.waitFor({ state: 'visible' });
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
