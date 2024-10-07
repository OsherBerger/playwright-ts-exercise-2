import { expect, Locator } from "@playwright/test";
import { PhonesList, LaptopsList, MonitorsList } from "../helpers/InventoryList";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    // Locators for homepage elements
    private phonesCategory = this.page.getByRole('link', { name: 'Phones' });
    private laptopsCategory = this.page.getByRole('link', { name: 'Laptops' });
    private monitorsCategory = this.page.getByRole('link', { name: 'Monitors' });
    private homeLink = this.page.getByRole('link', { name: 'Home (current)' });
    private contactLink = this.page.getByRole('link', { name: 'Contact' });
    private aboutUsLink = this.page.getByRole('link', { name: 'About us' });
    private cartLink = this.page.getByRole('link', { name: 'Cart', exact: true });
    private loginLink = this.page.getByRole('link', { name: 'Log in' });
    private signUpLink = this.page.getByRole('link', { name: 'Sign up' });
    private closeButton = this.page.getByRole('button', { name: 'Close' }).nth(1);
    private addToCartButton = this.page.locator('a.btn.btn-success.btn-lg');
    

    private productsByCategory = {
        'Phones': Object.values(PhonesList),
        'Laptops': Object.values(LaptopsList),
        'Monitors': Object.values(MonitorsList)
    };

    public async selectItem(itemName: string) {
        await this.clickElement(this.page.getByText(itemName)); 
        await this.clickElement(this.addToCartButton); 
    }

    public async validateCategory(category: "Phones" | "Laptops" | "Monitors") {
        await this.clickCategory(category);
        const expectedProducts = this.productsByCategory[category];
        await this.page.waitForSelector('h4.card-title a');
        const productNames = await this.page.locator('h4.card-title a').allTextContents();
        
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
        await this.clickElement(this.loginLink);
    }
    
    public async SignUp() {
        await this.clickElement(this.signUpLink);
    }
    
    public async closeModal() {
        await this.clickElement(this.closeButton);
    }


}
