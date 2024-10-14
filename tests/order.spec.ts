import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { PhonesList, LaptopsList, MonitorsList } from '../helpers/constants/InventoryList';
import { ApplicationURL, ModalTitles, Alert, Category } from '../helpers';
import { ModalComponent } from '../components/Modals';

function getRandomItem(items: string[]): string {
    return items[Math.floor(Math.random() * items.length)];
}

const allProducts = {
    Phones: Object.values(PhonesList),
    Laptops: Object.values(LaptopsList),
    Monitors: Object.values(MonitorsList),
};

test('Testing the order functionality with random items from all categories', async ({ page }) => {

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const modal = new ModalComponent(page);
    const selectedProducts: string[] = []; 

    const randomProducts = [
        { category: Category.Phones, product: getRandomItem(allProducts.Phones) },
        { category: Category.Laptops, product: getRandomItem(allProducts.Laptops) },
        { category: Category.Monitors, product: getRandomItem(allProducts.Monitors) },
    ];

    await test.step('Open the homepage and validate URL', async () => {
        await page.goto(ApplicationURL.BASE_URL);
        await homePage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    await test.step('Add random products to the cart from all categories', async () => {
        for (const { category, product } of randomProducts) {
            await homePage.navigateTo('home');
            await homePage.clickCategory(category);
            await homePage.chooseItem(product); 
            selectedProducts.push(product); 
            await homePage.AddAndAlert(Alert.Add); 
        }
    });

    await test.step('Validate the Cart and Place Order', async () => {
        await homePage.navigateTo('cart');
        await homePage.validatePageUrl(ApplicationURL.CART_URL);

        const amount = await cartPage.validateOrderPrices();
        await cartPage.validateCartItems(selectedProducts);
        await cartPage.placeOrder();
        await modal.validateModalTitle(ModalTitles.PLACE_ORDER_MODAL);

        const orderDetails = await cartPage.generateRandomDetails();
        await cartPage.fillOrderForm(orderDetails);
        
        await cartPage.confirmPurchase();
        await cartPage.validateOrderDetails(orderDetails, amount);
        await cartPage.endPurchase();
    });

});
