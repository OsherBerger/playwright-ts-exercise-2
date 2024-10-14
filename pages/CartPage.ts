import { expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { BasePage } from "./Base/BasePage";

export class CartPage extends BasePage {
    private placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
    private purchaseButton = this.page.getByRole('button', { name: 'Purchase' });
    private okButton = this.page.getByRole('button', { name: 'OK' });
    
    private nameField = this.page.locator('input#name.form-control');
    private countryField = this.page.locator('input#country.form-control'); 
    private cityField = this.page.locator('input#city.form-control'); 
    private creditCardField = this.page.locator('input#card.form-control'); 
    private monthField = this.page.locator('input#month.form-control'); 
    private yearField = this.page.locator('input#year.form-control');

    public generateRandomDetails() {
        faker.seed();  
        const countriesWithCities = {
            "Israel": ["Jerusalem", "Tel aviv", "Haifa", "Beer Sheba", "Eilat"],
            "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
            "United Kingdom": ["London", "Manchester", "Liverpool", "Birmingham", "Edinburgh"],
            "France": ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
            "Germany": ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"],
            "Japan": ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Sapporo"],
            "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"]
        };
    
        const countries = Object.keys(countriesWithCities);
        const selectedCountry = faker.helpers.arrayElement(countries) as string;  
        const selectedCity = faker.helpers.arrayElement(countriesWithCities[selectedCountry]) as string;
    
        const orderDetails = {
            name: faker.person.fullName(),
            country: selectedCountry,
            city: selectedCity,
            creditCard: faker.finance.creditCardNumber(),
            month: faker.date.future().getMonth().toString().padStart(2, '0'), 
            year: faker.date.future().getFullYear().toString(), 
        };
        console.log(orderDetails);

        return orderDetails;
    }
    

    public async fillOrderForm(details: {name: string,  country: string, city: string, creditCard: string, month: string, year: string }) {
        await this.fillText(this.nameField, details.name);
        await this.fillText(this.countryField, details.country);
        await this.fillText(this.cityField, details.city);
        await this.fillText(this.creditCardField, details.creditCard);
        await this.fillText(this.monthField, details.month);
        await this.fillText(this.yearField, details.year);

        return details;
    }

    public async validateOrderPrices() {
        const totalLocator = this.page.locator('#totalp');
        await totalLocator.waitFor({ state: 'visible' });
        // await this.page.pause();
        const totalText = await totalLocator.innerText();         
        const expectedTotal = parseFloat(totalText.replace(/[^\d.-]/g, '')); 
        console.log(`Expected total amount: ${expectedTotal}`); 
       
        const productPriceElements = await this.page.locator('#tbodyid tr td:nth-child(3)').allTextContents();
        console.log(`Extracted product prices: ${productPriceElements}`);
       
        const productPrices = productPriceElements.map(price => parseFloat(price.trim().replace(/[^\d.-]/g, '')));    
        const calculatedTotal = productPrices.reduce((sum, price) => sum + price, 0);
        console.log(`Calculated total: ${calculatedTotal}`); 
        expect(calculatedTotal).toBe(expectedTotal);
    
        return calculatedTotal;
    }
    
    // public async validateCartItems(expectedProducts: string[]) {
    //     const cartItems = await this.page.locator('#tbodyid tr td:nth-child(2)').allTextContents();
    //     console.log(`Extracted product names from the cart: ${cartItems}`);
    //     expectedProducts.forEach(product => {
    //         expect(cartItems).toContain(product); 
    //     });
    //     console.log("All selected products are correctly displayed in the cart.");
    // }

    public async validateCartItems(expectedProducts: string[]) {
        const cartItems = await this.page.locator('#tbodyid tr td:nth-child(2)').allTextContents();
        console.log(`Extracted product names from the cart: ${cartItems}`);
        
        // Trim the cart items to remove extra spaces/newlines
        const trimmedCartItems = cartItems.map(item => item.trim());
    
        expectedProducts.forEach(product => {
            expect(trimmedCartItems).toContain(product);
        });
        
        console.log("All selected products are correctly displayed in the cart.");
    }
    

    public async placeOrder() {
        await this.clickElement(this.placeOrderButton);
        // await this.page.pause();
        await this.page.waitForLoadState('networkidle');
    }

    public async confirmPurchase() {
        await this.clickElement(this.purchaseButton);
    }

    public async endPurchase() {
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
