# playwright-ts-exercise-2
# Automation Development Exercise


## Overview

This repository contains automation scripts developed using TypeScript and Playwright for testing the website (https://www.demoblaze.com).
The scripts include various functionalities such as product filtering, menu button validation, message submission, and order placement, following best practices in automation development.


## Table of Contents

1. [Setup](#setup)
2. [Project Structure](#project-structure)
3. [Test Scenarios](#test-scenarios)
   - [1. Home Page Object](#1-home-page-object)
   - [2. Cart Page Object](#2-cart-page-object)
   - [3. Product Filtering](#3-product-filtering)
   - [4. Menu Button Validation](#4-menu-button-validation)
   - [5. Message Submission](#5-message-submission)
   - [6. Order Placement](#6-order-placement)
4. [Running the Tests](#running-the-tests)
5. [Reporting](#reporting)
6. [Bonus Features](#bonus-features)
7. [Contributing](#contributing)


## Setup

   Clone the repository:(bash)
   git clone https://github.com/OsherBerger/playwright-ts-exercise-2
   cd playwright-ts-exercise-2
   npm install
   

## Project Structure
    
    .
    ├── src
    │   ├── pages
    │   │   └── BasePage.ts
    │   │   ├── HomePage.ts
    │   │   └── CartPage.ts
    │   ├── tests
    │   │   ├── filter.spec.ts
    │   │   ├── navigation.spec.ts
    │   │   ├── messages.spec.ts
    │   │   └── order.spec.ts
    │   └── helpers
    │       └── ApplicationURL.ts
    │       └── InventoryList.ts
    │       └── ModalTitles.ts
    ├── playwright.config.ts
    └── package.json


## Test Scenarios

    1. Home Page Object
    Implemented a Page Object for the home page located at https://www.demoblaze.com.
    2. Cart Page Object
    Implemented a Page Object for the shopping cart page located at https://www.demoblaze.com/cart.html.
    3. Product Filtering
    Click on the product filter button.
    Filter each product type one at a time.
    Validate that only products of the selected type are displayed according to a predefined list of products.
    4. Menu Button Validation
    Click each menu button in the top menu.
    Ensure that each button directs to the correct page or opens the appropriate menu.
    5. Message Submission
    Click on the "Contact us" button.
    Validate that the message modal opens.
    Fill in all required details in the form and click "Send message".
    Ensure an alert is displayed confirming that the message was sent.
    6. Order Placement
    Add one or more products to the cart from the product page.
    Validate that an alert is shown indicating that the product has been added to the cart.
    Click on the cart button and ensure it directs to the cart page with the selected products displayed.
    Click on the order button and ensure that the order form opens.
    Fill in the order details using random information and click the purchase button, followed by clicking OK.
    Validate that the order is confirmed with the entered details and the correct total amount.


## Running the Tests

    To run the tests, execute the following command in your terminal:(bash)
    npx playwright test


## Reporting

    The results of the automation run can be generated using Allure or Playwright's built-in reporting. To view the report after running the tests, you can use the following command:(bash)
    npx playwright show-report


## Bonus Features

    Additional testing implemented where necessary.
    Calculation of the total order amount during the order placement process.


## Contributing

    Feel free to fork the repository and submit pull requests for improvements or bug fixes. Please make sure to follow the coding standards and include tests for any new features.

