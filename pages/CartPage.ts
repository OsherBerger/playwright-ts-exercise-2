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

    public async validateOrder(){
        
    }
}
