import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    private placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
    private purchaseButton = this.page.getByRole('button', { name: 'Purchase' });
    private okButton = this.page.getByRole('button', { name: 'OK' });
    
    // Form fields
    // private totalField = this.page.getByLabel('Total:');
    private nameField = this.page.locator('input#name.form-control'); // Updated locator for the name field
    private countryField = this.page.locator('input#country.form-control'); // Update ID or use a more specific selector
    private cityField = this.page.locator('input#city.form-control'); // Update ID or use a more specific selector
    private creditCardField = this.page.locator('input#card.form-control'); // Update ID or use a more specific selector
    private monthField = this.page.locator('input#month.form-control'); // Update ID or use a more specific selector
    private yearField = this.page.locator('input#year.form-control'); // Update ID or use a more specific selector


    public async fillOrderForm(details: {name: string,  country: string, city: string, creditCard: string, month: string, year: string }) {
        await this.fillText(this.nameField, details.name);
        await this.fillText(this.countryField, details.country);
        await this.fillText(this.cityField, details.city);
        await this.fillText(this.creditCardField, details.creditCard);
        await this.fillText(this.monthField, details.month);
        await this.fillText(this.yearField, details.year);
    }

    public async placeOrder() {
        await this.clickElement(this.placeOrderButton);
    }

    public async confirmPurchase() {
        await this.clickElement(this.purchaseButton);
        await this.clickElement(this.okButton);
    }

    public async validateOrder() {
        // Extract the list of products from the cart
        const cartItems = await this.page.locator('.card-title a').allTextContents(); // Update the locator as needed
    
        // Extract the expected products from the previous steps
        const expectedProducts = await this.page.locator('.modal-body').innerText(); // Modify this to capture the product names added to the cart
        const productNames = expectedProducts.split('\n'); // Split the text to get product names
    
        // Log the results for debugging
        console.log(`Cart items: ${cartItems}`);
        console.log(`Expected products: ${productNames}`);
    
        // Validate that each expected product is in the cart
        for (const expectedProduct of productNames) {
            expect(cartItems).toContain(`Expected product "${expectedProduct}" is found in the cart.`);
        }
    
        console.log("All products in the cart are correct.");
    }
    
}
