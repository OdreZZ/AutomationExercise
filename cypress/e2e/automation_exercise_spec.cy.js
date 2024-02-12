// TODO: Any way to make this smaller?
import {
  NAV_PRODUCTS_BUTTON,
  NAV_LOGIN_REGISTER_BUTTON,
  NAV_CART_BUTTON,
  NAV_DELETE_USER_BUTTON,
  NAV_CONTACT_US_BUTTON,
  HOME_TEST_CASES_BUTTON,
  PRODUCTS_LIST,
  PRODUCTS_SEARCH_FIELD,
  PRODUCTS_SEARCH_BUTTON,
  PRODUCTS_PRICE_TEXT,
  PRODUCTS_VIEW_PRODUCT_BUTTON,
  PRODUCTS_NAME_CONTAINER,
  PRODUCTS_CATEGORY_CONTAINER,
  PRODUCTS_PRICE_CONTAINER,
  PRODUCTS_AVAILABILITY_CONTAINER,
  PRODUCTS_CONDITION_CONTAINER,
  PRODUCTS_BRAND_CONTAINER,
  PRODUCTS_ADD_TO_CART_BUTTON,
  CART_PRODUCT_ITEMS,
  CART_PRODUCT_PRICE,
  SIGNUP_NAME_FIELD,
  SIGNUP_EMAIL_FIELD,
  SIGNUP_SUBMIT_BUTTON,
  SIGNUP_GENDER_MALE_BUTTON,
  SIGNUP_PASSWORD_FIELD,
  SIGNUP_DATE_DAY_SELECT,
  SIGNUP_DATE_MONTH_SELECT,
  SIGNUP_DATE_YEAR_SELECT,
  SIGNUP_NEWSLETTER_CHECKBOX,
  SIGNUP_SPECIAL_OFFERS_CHECKBOX,
  SIGNUP_FIRST_NAME_FIELD,
  SIGNUP_LAST_NAME_FIELD,
  SIGNUP_ADDRESS_FIELD,
  SIGNUP_COUNTRY_SELECT,
  SIGNUP_STATE_FIELD,
  SIGNUP_CITY_FIELD,
  SIGNUP_ZIPCODE_FIELD,
  SIGNUP_MOBILE_NUMBER_FIELD,
  SIGNUP_CREATE_ACCOUNT_BUTTON,
  SIGNUP_CONTINUE_BUTTON,
  CONTACT_US_NAME_FIELD,
  CONTACT_US_EMAIL_FIELD,
  CONTACT_US_SUBJECT_FIELD,
  CONTACT_US_MESSAGE_FIELD,
  CONTACT_US_FILE,
  CONTACT_US_SUBMIT_BUTTON,
  FOOTER_SUBSCRIPTION_EMAIL_FIELD,
  FOOTER_SUBSCRIPTION_BUTTON,
  MODAL_CONTINUE_SHOPPING_BUTTON,
  HOME_VIEW_PRODUCT,
  PRODUCT_DETAILS_QUANTITY_INPUT,
  PRODUCT_DETAILS_ADD_TO_CART_BUTTON,
  CART_PRODUCT_QUANTITY,
  MODAL_VIEW_CART_LINK,
  CART_REMOVE_PRODUCT,
} from "../support/selectors";

const USER_NAME = "QA User";
const USER_EMAIL = "zaid.zerdo+qa@gmail.com";
const USER_PASSWORD = "testqa1";
const USER_DATE_OF_BIRTH = ["28", "1", "1994"];
const USER_FIRST_NAME = "QA";
const USER_LAST_NAME = "User";
const USER_ADDRESS = "Address 1";
const USER_COUNTRY = "Canada";
const USER_STATE = "State 1";
const USER_CITY = "City 1";
const USER_ZIPCODE = "10000";
const USER_MOBILE_NUMBER = "38712983823";

const PRODUCT_SEARCH_TERM = "Green";

beforeEach(() => {
  cy.visit('https://automationexercise.com');
  cy.title().should('include', 'Automation Exercise');
});

describe('Automation Exercise', () => {
  it('should register a user', () => {
    cy.get(NAV_LOGIN_REGISTER_BUTTON).click();
    cy.contains('New User Signup!').should('be.visible');

    cy.get(SIGNUP_NAME_FIELD).type(USER_NAME);
    cy.get(SIGNUP_EMAIL_FIELD).type(USER_EMAIL);
    cy.get(SIGNUP_SUBMIT_BUTTON).click();
    cy.contains('Enter Account Information').should('be.visible');

    cy.get(SIGNUP_GENDER_MALE_BUTTON).click();
    cy.get(SIGNUP_PASSWORD_FIELD).type(USER_PASSWORD);
    cy.get(SIGNUP_DATE_DAY_SELECT).select(USER_DATE_OF_BIRTH[0]);
    cy.get(SIGNUP_DATE_MONTH_SELECT).select(USER_DATE_OF_BIRTH[1]);
    cy.get(SIGNUP_DATE_YEAR_SELECT).select(USER_DATE_OF_BIRTH[2]);
    cy.get(SIGNUP_NEWSLETTER_CHECKBOX).click();
    cy.get(SIGNUP_SPECIAL_OFFERS_CHECKBOX).click();
    cy.get(SIGNUP_FIRST_NAME_FIELD).type(USER_FIRST_NAME);
    cy.get(SIGNUP_LAST_NAME_FIELD).type(USER_LAST_NAME);
    cy.get(SIGNUP_ADDRESS_FIELD).type(USER_ADDRESS);
    cy.get(SIGNUP_COUNTRY_SELECT).select(USER_COUNTRY);
    cy.get(SIGNUP_STATE_FIELD).type(USER_STATE);
    cy.get(SIGNUP_CITY_FIELD).type(USER_CITY);
    cy.get(SIGNUP_ZIPCODE_FIELD).type(USER_ZIPCODE);
    cy.get(SIGNUP_MOBILE_NUMBER_FIELD).type(USER_MOBILE_NUMBER);
    cy.get(SIGNUP_CREATE_ACCOUNT_BUTTON).click();
    cy.contains('Account Created!').should('be.visible');

    cy.get(SIGNUP_CONTINUE_BUTTON).click();
    cy.contains(`Logged in as ${USER_NAME}`).should('be.visible');
  });

  it('should login with fresh user credentials', () => {
    cy.login(USER_EMAIL, USER_PASSWORD);
    cy.contains(`Logged in as ${USER_NAME}`).should('be.visible');
  });

  it('should not login with incorrect credentials', () => {
    cy.login('wrongusername@wrong.wrong', 'wrongpassword');
    cy.contains('Your email or password is incorrect!').should('be.visible');
  });

  it('should logout', () => {
    cy.login(USER_EMAIL, USER_PASSWORD);
    cy.contains(`Logged in as ${USER_NAME}`).should('be.visible');

    cy.logout();
    cy.contains('Login to your account').should('be.visible');
  });

  it('should fail registration with existing email', () => {
    cy.get(NAV_LOGIN_REGISTER_BUTTON).click();
    cy.contains('New User Signup!').should('be.visible');

    cy.get(SIGNUP_NAME_FIELD).type(USER_NAME);
    cy.get(SIGNUP_EMAIL_FIELD).type(USER_EMAIL);
    cy.get(SIGNUP_SUBMIT_BUTTON).click();
    cy.contains('Email Address already exist!').should('be.visible');
  });

  it('should send a contact us form with file', () => {
    cy.get(NAV_CONTACT_US_BUTTON).click();
    cy.contains('Get In Touch').should('be.visible');

    cy.get(CONTACT_US_NAME_FIELD).type(USER_NAME);
    cy.get(CONTACT_US_EMAIL_FIELD).type(USER_EMAIL);
    cy.get(CONTACT_US_SUBJECT_FIELD).type('Contact Us Test');
    cy.get(CONTACT_US_MESSAGE_FIELD).type('Short message');
    cy.get(CONTACT_US_FILE).attachFile('example.json', { mimeType: 'text/plain' });
    cy.get(CONTACT_US_SUBMIT_BUTTON).click();
    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
  });

  it('should navigate to test cases', () => {
    cy.get(HOME_TEST_CASES_BUTTON).click();
    cy.url().should('include', 'test_cases');
  });

  it('should verify all products and detail page', () => {
    cy.get(NAV_PRODUCTS_BUTTON).click();
    cy.contains('All Products').should('be.visible');

    cy.get(PRODUCTS_LIST).should('have.length.gte', 5);

    cy.get(PRODUCTS_LIST).first().find(PRODUCTS_VIEW_PRODUCT_BUTTON).click();

    cy.get(PRODUCTS_NAME_CONTAINER).should('not.have.text', '');
    cy.get(PRODUCTS_CATEGORY_CONTAINER).should('not.have.text', '');
    cy.get(PRODUCTS_PRICE_CONTAINER).should('not.have.text', '');
    cy.get(PRODUCTS_AVAILABILITY_CONTAINER).should('not.have.text', '');
    cy.get(PRODUCTS_CONDITION_CONTAINER).should('not.have.text', '');
    cy.get(PRODUCTS_BRAND_CONTAINER).should('not.have.text', '');
  });

  // TODO:
  //  x  Test Case 9: Search Product
  //  x  Test Case 10: Verify Subscription in home page
  //  x  Test Case 11: Verify Subscription in Cart page
  //  x  Test Case 12: Add Products in Cart
  //  -  Test Case 13: Verify Product quantity in Cart
  //  -  Test Case 14: Place Order: Register while Checkout
  //  -  Test Case 15: Place Order: Register before Checkout
  //  -  Test Case 16: Place Order: Login before Checkout

  it('should search for product', () => {
    cy.get(NAV_PRODUCTS_BUTTON).click();
    cy.title().should('include', 'All Products');

    cy.get(PRODUCTS_SEARCH_FIELD).type(PRODUCT_SEARCH_TERM);
    cy.get(PRODUCTS_SEARCH_BUTTON).click();

    cy.contains('Searched Products').should('be.visible');
    cy.get(PRODUCTS_LIST).should('have.length.gte', 1);
    cy.get(PRODUCTS_LIST).each(($el) => {
      // TODO: Improve
      expect($el.text()).to.include(PRODUCT_SEARCH_TERM);
    });
  });

  it('should verify subscription on home page', () => {
    cy.get(FOOTER_SUBSCRIPTION_EMAIL_FIELD).type(USER_EMAIL);
    cy.get(FOOTER_SUBSCRIPTION_BUTTON).click();
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('should verify subscription on cart page', () => {
    cy.get(NAV_CART_BUTTON).first().click();

    cy.get(FOOTER_SUBSCRIPTION_EMAIL_FIELD).type(USER_EMAIL);
    cy.get(FOOTER_SUBSCRIPTION_BUTTON).click();
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('should add products to cart', () => {
    cy.get(NAV_PRODUCTS_BUTTON).click();

    cy.get(PRODUCTS_LIST).eq(0).find(PRODUCTS_PRICE_TEXT).invoke('text').then(text => {
      cy.wrap(text).as('firstPrice');
    });
    cy.get(PRODUCTS_LIST).eq(1).find(PRODUCTS_PRICE_TEXT).invoke('text').then(text => {
      cy.wrap(text).as('secondPrice');
    });

    cy.get(PRODUCTS_LIST).eq(0).find(PRODUCTS_ADD_TO_CART_BUTTON).first().click();
    cy.get(MODAL_CONTINUE_SHOPPING_BUTTON).click();
    cy.get(PRODUCTS_LIST).eq(1).find(PRODUCTS_ADD_TO_CART_BUTTON).first().click();
    cy.get(MODAL_CONTINUE_SHOPPING_BUTTON).click();

    cy.get(NAV_CART_BUTTON).first().click();

    cy.get('@firstPrice').then(firstPrice => {
      cy.get(CART_PRODUCT_ITEMS).eq(0).find(CART_PRODUCT_PRICE).should('include.text', firstPrice);  
    });
    
    cy.get('@secondPrice').then(secondPrice => {
      cy.get(CART_PRODUCT_ITEMS).eq(1).find(CART_PRODUCT_PRICE).should('include.text', secondPrice);
    });
  });

  it('should add products to cart of exact quantity', () => {
    const QUANTITY_TO_TEST = 10;

    cy.get(HOME_VIEW_PRODUCT).first().click();

    cy.get(PRODUCT_DETAILS_QUANTITY_INPUT).clear();
    cy.get(PRODUCT_DETAILS_QUANTITY_INPUT).type(QUANTITY_TO_TEST);
    cy.get(PRODUCT_DETAILS_ADD_TO_CART_BUTTON).click();

    cy.wait(500);
    cy.get(MODAL_VIEW_CART_LINK).click();

    cy.get(CART_PRODUCT_QUANTITY).should('have.text', `${QUANTITY_TO_TEST}`);
  });

  it.only('should add product and remove it from cart', () => {
    cy.get(HOME_VIEW_PRODUCT).first().click();
    cy.get(PRODUCT_DETAILS_ADD_TO_CART_BUTTON).click();

    cy.wait(500);
    cy.get(MODAL_VIEW_CART_LINK).click();

    cy.wait(500);
    cy.get(CART_REMOVE_PRODUCT).click();

    cy.contains('Cart is empty!').should('be.visible');
  });


  it('should delete account', () => {
    cy.login(USER_EMAIL, USER_PASSWORD);

    cy.get(NAV_DELETE_USER_BUTTON).click();
    cy.contains('Account Deleted!').should('be.visible');
  });
});
