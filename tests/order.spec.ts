import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { PhonesList, LaptopsList, MonitorsList } from '../helpers/constants/InventoryList';
import { ApplicationURL, ModalTitles, Alert, Category } from '../helpers';
import { ModalComponent } from '../components/Modals';

test('Testing the order functionality', async ({ page }) => {

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const modal = new ModalComponent(page)
    const selectedProducts: string[] = []; 

    await test.step('Open the homepage and validate URL', async () => {
        await page.goto(ApplicationURL.BASE_URL);
        await homePage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    await test.step('Add products to the cart', async () => {
        // Add Phone
        await homePage.navigateToHome();
        await homePage.clickCategory(Category.Phones);
        await homePage.chooseItem(PhonesList.IPHONE);
        selectedProducts.push(PhonesList.IPHONE); 
        await homePage.AddAndAlert(Alert.Add);

        // Add Laptop
        await homePage.navigateToHome();
        await homePage.clickCategory(Category.Laptops);
        await homePage.chooseItem(LaptopsList.MAC_PRO);
        selectedProducts.push(LaptopsList.MAC_PRO); 
        await homePage.AddAndAlert(Alert.Add);

        // Add Monitor
        await homePage.navigateToHome();
        await homePage.clickCategory(Category.Monitors);
        await homePage.chooseItem(MonitorsList.APPLE);
        selectedProducts.push(MonitorsList.APPLE); 
        await homePage.AddAndAlert(Alert.Add);
    });

    await test.step('Validate the Cart and Place Order', async () => {
        await homePage.Cart(); 
        await homePage.validatePageUrl(ApplicationURL.CART_URL);

        const amount = await cartPage.validateOrderPrices();
        await cartPage.validateCartItems(selectedProducts);
        await cartPage.placeOrder();
        await modal.validateModalTitle(ModalTitles.PLACE_ORDER_MODAL);

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
