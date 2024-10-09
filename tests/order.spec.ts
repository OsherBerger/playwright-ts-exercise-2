import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { PhonesList, LaptopsList, MonitorsList } from '../helpers/InventoryList';
import ApplicationURL from '../helpers/ApplicationURL';
import { ModalTitles } from '../helpers/ModalTitles';

test('Testing the order functionality', async ({ page }) => {

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const selectedProducts: string[] = []; 

    await test.step('Open the homepage and validate URL', async () => {
        await page.goto(ApplicationURL.BASE_URL);
        await homePage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    await test.step('Add products to the cart', async () => {
        // Add Phone
        await homePage.navigateToHome();
        await homePage.clickCategory('Phones');
        await homePage.chooseItem(PhonesList.IPHONE);
        selectedProducts.push(PhonesList.IPHONE); 
        await homePage.AddAndAlert('Product added');

        // Add Laptop
        await homePage.navigateToHome();
        await homePage.clickCategory('Laptops');
        await homePage.chooseItem(LaptopsList.MAC_PRO);
        selectedProducts.push(LaptopsList.MAC_PRO); 
        await homePage.AddAndAlert('Product added');

        // Add Monitor
        await homePage.navigateToHome();
        await homePage.clickCategory('Monitors');
        await homePage.chooseItem(MonitorsList.APPLE);
        selectedProducts.push(MonitorsList.APPLE); 
        await homePage.AddAndAlert('Product added');
    });

    await test.step('Validate the Cart and Place Order', async () => {
        await homePage.Cart(); 
        await homePage.validatePageUrl(ApplicationURL.CART_URL);

        const amount = await cartPage.validateOrderPrices();
        await cartPage.validateCartItems(selectedProducts);
        await cartPage.placeOrder();
        await homePage.validateTitle(ModalTitles.PLACE_ORDER_MODAL);

        const orderDetails = await cartPage.fillOrderForm({
            name: 'Osher Berger',
            country: 'ISRAEL',
            city: 'TIRAT YEHUDA',
            creditCard: '1234123412341234',
            month: '10',
            year: '2024',
        });
        
        await cartPage.confirmPurchase();
        await cartPage.validateOrderDetails(orderDetails, amount);
        await cartPage.endPurchase();
    });

});
