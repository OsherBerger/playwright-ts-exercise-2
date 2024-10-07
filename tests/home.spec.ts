import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { MessagePage } from '../pages/MessagePage';

test('Test the Demoblaze site', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const messagePage = new MessagePage (page)

    // Navigate to the homepage and interact with categories
    await page.goto('https://demoblaze.com/');
    await homePage.clickCategory('Phones');
    await homePage.clickCategory('Laptops');
    await homePage.clickCategory('Monitors');

    // Navigate through various links
    await homePage.navigateToHome();
    await homePage.ContactForm();
    await homePage.closeModal();
    await homePage.AboutUs();
    await homePage.closeModal();    
    await homePage.Cart();
    await homePage.Login();
    await homePage.closeModal();
    await homePage.SignUp();
    await homePage.closeModal();

    //Sending a message
    await homePage.ContactForm();
    await messagePage.fillInformation('osherberger@gmail.com', 'Osher', 'Hello World');
    await messagePage.sendMessage();

    
    // Fill order form in the cart
    // await cartPage.placeOrder();
    // await cartPage.fillOrderForm({
        // name: 'Osher',
        // country: 'USA',
        // city: 'New York',
        // creditCard: '123456789',
        // month: '10',
        // year: '2024',
    // });

    // Confirm purchase
    // await cartPage.confirmPurchase();
});
