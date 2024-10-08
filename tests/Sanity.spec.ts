import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { MessagePage } from '../pages/MessagePage';
import { PhonesList,LaptopsList,MonitorsList } from '../helpers/InventoryList';
import ApplicationURL from '../helpers/ApplicationURL';
import { ModalTitlesId, ModalTitlesText } from '../helpers/ModalTitles';

test('Test the Demoblaze site', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const messagePage = new MessagePage (page)
    
    await page.goto(ApplicationURL.BASE_URL);
    await homePage.validatePageUrl(ApplicationURL.BASE_URL);


    // // Validate category filters and ensure only correct products are shown
    await homePage.validateCategory("Phones");
    await homePage.navigateToHome();//added as timeout because of internet speed
    await homePage.validateCategory("Laptops");
    await homePage.navigateToHome();//added as timeout because of internet speed
    await homePage.validateCategory("Monitors");

    //Checking Links in upper menu
    await homePage.navigateToHome();
    await homePage.validatePageUrl(ApplicationURL.HOME_URL);
    
    await homePage.ContactForm();
    await homePage.validateTitle(ModalTitlesText.CONTACT_MODAL);
    await homePage.closeModal();
    
    await homePage.AboutUs();
    await homePage.validateTitle(ModalTitlesText.ABOUT_US_MODAL);
    await homePage.closeModal();    

    await homePage.Cart();
    await homePage.validatePageUrl(ApplicationURL.CART_URL);

    await homePage.Login();
    await homePage.validateTitle(ModalTitlesText.LOG_IN_MODAL);
    await homePage.closeModal();

    await homePage.SignUp();
    await homePage.validateTitle(ModalTitlesText.SIGN_UP_MODAL);
    await homePage.closeModal();

    // // //Sending a message
    // await homePage.ContactForm();
    // await messagePage.fillInformation({
    //     contactEmail:'osherberger@gmail.com',
    //     contactName: 'Osher Berger',
    //     message: 'Hello World'
    // });
    // await messagePage.sendMessage();

    
    // // Make order
    // await homePage.navigateToHome();
    // await homePage.clickCategory('Phones');
    // await homePage.selectItem(PhonesList.IPHONE);
    // await homePage.Cart(); 
    // await cartPage.placeOrder();
    // await cartPage.fillOrderForm({
    //     name: 'Osher Berger',
    //     country: 'ISRAEL',
    //     city: 'TIRAT YEHUDA',
    //     creditCard: '1234123412341234',
    //     month: '10',
    //     year: '2024',
    // });
    // await cartPage.confirmPurchase();
});
