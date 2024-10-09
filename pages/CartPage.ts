import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    private placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
    private purchaseButton = this.page.getByRole('button', { name: 'Purchase' });
    private okButton = this.page.getByRole('button', { name: 'OK' });
    
    // Form fields
    private totalField = this.page.getByLabel('Total:');
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

        return details;
    }

    public async validateOrder() {

        const amount = 1890;

        return amount;
    }

    public async placeOrder() {
        await this.clickElement(this.placeOrderButton);
        await this.page.waitForLoadState('networkidle');//works like timeout in order to load  all the data
    }

    public async confirmPurchase() {
        await this.clickElement(this.purchaseButton);
    }

    public async ValidatePurchase() {
        await this.clickElement(this.okButton);
    }

    public async validateOrderDetails(expectedDetails: { 
        name: string, 
        country: string, 
        city: string, 
        creditCard: string, 
        month: string, 
        year: string },
        amount: number) {
        
        const orderDetailsModal = await this.page.locator('.sweet-alert .lead.text-muted').innerText();
        
        const namePattern = /Name:\s*([^\n]+)/;
        const cardNumberPattern = /Card Number:\s*([^\n]+)/;
        const amountPattern = /Amount:\s*(\d+)\s*USD/;

        const extractedName = orderDetailsModal.match(namePattern)?.[1];
        const extractedCardNumber = orderDetailsModal.match(cardNumberPattern)?.[1];
        const extractedAmount = orderDetailsModal.match(amountPattern)?.[1];

        const extractedAmountNumber = Number(extractedAmount)

        expect(extractedName).toBe(expectedDetails.name);
        expect(extractedCardNumber).toBe(expectedDetails.creditCard);
        expect(extractedAmountNumber).toBe(amount);

        console.log("Order details are correct:");
        console.log(`Name: ${extractedName}, Expected: ${expectedDetails.name}`);
        console.log(`Card Number: ${extractedCardNumber}, Expected: ${expectedDetails.creditCard}`);
        console.log(`Amount: ${extractedAmountNumber}, Expected: ${amount}`);

    }
}
