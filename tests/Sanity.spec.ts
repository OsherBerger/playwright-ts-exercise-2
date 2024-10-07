import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { MessagePage } from '../pages/MessagePage';
import { MonitorsList } from '../helpers/InventoryList';

test('Test the Demoblaze site', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const messagePage = new MessagePage (page)
    
    await page.goto('https://demoblaze.com/');

    //Filtering items
    await homePage.clickCategory('Phones');
    await homePage.clickCategory('Laptops');
    await homePage.clickCategory('Monitors');

    //Checking Links in upper menu
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
    await messagePage.fillInformation({
        contactEmail:'osherberger@gmail.com',
        contactName: 'Osher Berger',
        message: 'Hello World'
    });
    await messagePage.sendMessage();

    
    // Make order
    await homePage.navigateToHome();
    await homePage.clickCategory('Monitors');
    await homePage.selectItem(MonitorsList.APPLE);
    await homePage.Cart(); 
    await cartPage.placeOrder();
    await cartPage.fillOrderForm({
        name: 'Osher Berger',
        country: 'ISRAEL',
        city: 'TIRAT YEHUDA',
        creditCard: '1234123412341234',
        month: '10',
        year: '2024',
    });
    await cartPage.confirmPurchase();
});
