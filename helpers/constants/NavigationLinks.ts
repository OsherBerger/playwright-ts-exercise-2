import { ApplicationURL, ModalTitles } from "../index";

export const NavigationLinks = [
    { name: 'home', expectedUrl: ApplicationURL.HOME_URL, isModal: false },
    { name: 'contact', modalTitle: ModalTitles.CONTACT_MODAL, isModal: true },
    { name: 'aboutUs', modalTitle: ModalTitles.ABOUT_US_MODAL, isModal: true },
    { name: 'cart', expectedUrl: ApplicationURL.CART_URL, isModal: false },
    { name: 'logIn', modalTitle: ModalTitles.LOG_IN_MODAL, isModal: true },
    { name: 'signUp', modalTitle: ModalTitles.SIGN_UP_MODAL, isModal: true }
];