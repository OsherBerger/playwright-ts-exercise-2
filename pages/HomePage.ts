import { MonitorsList } from "../helpers/InventoryList";
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
    
    public async selectItem(itemName: string) {
        await this.clickElement(this.page.getByText(itemName)); 
        await this.clickElement(this.addToCartButton); 
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
