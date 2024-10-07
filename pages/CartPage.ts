import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    private placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
    private purchaseButton = this.page.getByRole('button', { name: 'Purchase' });
    private okButton = this.page.getByRole('button', { name: 'OK' });
    
    // Form fields
    private totalField = this.page.getByLabel('Total:');
    private nameField = this.page.getByLabel('Name:');
    private countryField = this.page.getByLabel('Country:');
    private cityField = this.page.getByLabel('City:');
    private creditCardField = this.page.getByLabel('Credit card:');
    private monthField = this.page.getByLabel('Month:');
    private yearField = this.page.getByLabel('Year:');

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
}
