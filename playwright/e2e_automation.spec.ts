import { test, expect } from '@playwright/test';
import {
  NAV_PRODUCTS_BUTTON,
  NAV_LOGIN_REGISTER_BUTTON,
  NAV_CART_BUTTON,
  NAV_DELETE_USER_BUTTON,
  NAV_CONTACT_US_BUTTON,
  NAV_LOGOUT_USER_BUTTON,
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
  SIGNIN_EMAIL_FIELD,
  SIGNIN_PASSWORD_FIELD,
  SIGNIN_LOGIN_BUTTON,
  HOME_VIEW_PRODUCT,
  PRODUCT_DETAILS_QUANTITY_INPUT,
  PRODUCT_DETAILS_ADD_TO_CART_BUTTON,
  MODAL_VIEW_CART_LINK,
  CART_PRODUCT_QUANTITY,
  POPUP_AD_CLOSE_BUTTON,
  CART_REMOVE_PRODUCT,
} from "../cypress/support/selectors";

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

const login = async (page, email, password) => {
  await page.locator(NAV_LOGIN_REGISTER_BUTTON).click();
  await expect(page.locator('text=Login to your account')).toBeVisible();

  await page.locator(SIGNIN_EMAIL_FIELD).fill(email);
  await page.locator(SIGNIN_PASSWORD_FIELD).fill(password);
  await page.locator(SIGNIN_LOGIN_BUTTON).click();
};

const logout = async (page) => {
  await page.locator(NAV_LOGOUT_USER_BUTTON).click();
};

const deleteAccount = async (page, email, password) => {
  await login(page, email, password);

  await page.locator(NAV_DELETE_USER_BUTTON).click();
  await expect(page.locator('text=Account Deleted!')).toBeVisible();
};

test.beforeEach(async ({ page }) => {
  await page.route("**/*", route => {
    route.request().url().startsWith("https://googleads.") ?
      route.abort() : route.continue();
    return;
  })

  await page.goto('https://automationexercise.com');
  await expect(page).toHaveTitle('Automation Exercise');
});

test.describe('Automation Exercise', () => {
  test('should register a user', async ({ page }) => {
    await page.locator(NAV_LOGIN_REGISTER_BUTTON).click();
    await page.isVisible('text=New User Signup!');

    await page.locator(SIGNUP_NAME_FIELD).fill(USER_NAME);
    await page.locator(SIGNUP_EMAIL_FIELD).fill(USER_EMAIL);
    await page.locator(SIGNUP_SUBMIT_BUTTON).click();
    await page.isVisible('text=Enter Account Information');

    await page.locator(SIGNUP_GENDER_MALE_BUTTON).click();
    await page.locator(SIGNUP_PASSWORD_FIELD).fill(USER_PASSWORD);
    await page.locator(SIGNUP_DATE_DAY_SELECT).selectOption(USER_DATE_OF_BIRTH[0]);
    await page.locator(SIGNUP_DATE_MONTH_SELECT).selectOption(USER_DATE_OF_BIRTH[1]);
    await page.locator(SIGNUP_DATE_YEAR_SELECT).selectOption(USER_DATE_OF_BIRTH[2]);
    await page.locator(SIGNUP_NEWSLETTER_CHECKBOX).click();
    await page.locator(SIGNUP_SPECIAL_OFFERS_CHECKBOX).click();
    await page.locator(SIGNUP_FIRST_NAME_FIELD).fill(USER_FIRST_NAME);
    await page.locator(SIGNUP_LAST_NAME_FIELD).fill(USER_LAST_NAME);
    await page.locator(SIGNUP_ADDRESS_FIELD).fill(USER_ADDRESS);
    await page.locator(SIGNUP_COUNTRY_SELECT).selectOption(USER_COUNTRY);
    await page.locator(SIGNUP_STATE_FIELD).fill(USER_STATE);
    await page.locator(SIGNUP_CITY_FIELD).fill(USER_CITY);
    await page.locator(SIGNUP_ZIPCODE_FIELD).fill(USER_ZIPCODE);
    await page.locator(SIGNUP_MOBILE_NUMBER_FIELD).fill(USER_MOBILE_NUMBER);
    await page.locator(SIGNUP_CREATE_ACCOUNT_BUTTON).click();
    await page.isVisible('text=Account Created!');

    await page.locator(SIGNUP_CONTINUE_BUTTON).click();
    await page.isVisible(`text=Logged in as ${USER_NAME}`);
  });

  test('should login with fresh user credentials', async ({ page }) => {
    await login(page, USER_EMAIL, USER_PASSWORD);
    await expect(page.locator(`text=Logged in as ${USER_NAME}`)).toBeVisible();
  });

  test('should not login with incorrect credentials', async ({ page }) => {
    await login(page, 'wrongusername@wrong.wrong', 'wrongpassword');
    await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
  });

  test('should logout', async ({ page }) => {
    await login(page,USER_EMAIL, USER_PASSWORD);
    await expect(page.locator(`text=Logged in as ${USER_NAME}`)).toBeVisible();

    await logout(page);
    await expect(page.locator('text=Login to your account')).toBeVisible();
  });

  test('should fail registration with existing email', async ({ page }) => {
    await page.locator(NAV_LOGIN_REGISTER_BUTTON).click();
    await expect(page.locator('text=New User Signup!')).toBeVisible();

    await page.locator(SIGNUP_NAME_FIELD).fill(USER_NAME);
    await page.locator(SIGNUP_EMAIL_FIELD).fill(USER_EMAIL);
    await page.locator(SIGNUP_SUBMIT_BUTTON).click();
    await expect(page.locator('text=Email Address already exist!')).toBeVisible();
  });

  test('should add products to cart of exact quantity', async ({ page }) => {
    const QUANTITY_TO_TEST = 10;

    await page.locator(HOME_VIEW_PRODUCT).first().click();

    await page.locator(PRODUCT_DETAILS_QUANTITY_INPUT).clear();
    await page.locator(PRODUCT_DETAILS_QUANTITY_INPUT).fill(`${QUANTITY_TO_TEST}`);
    await page.locator(PRODUCT_DETAILS_ADD_TO_CART_BUTTON).click();

    await page.waitForTimeout(500);
    await page.locator(MODAL_VIEW_CART_LINK).click();

    await expect(page.locator(CART_PRODUCT_QUANTITY)).toHaveText(`${QUANTITY_TO_TEST}`);
  });

  test('should add product and remove it from cart', async ({ page }) => {
    await page.locator(HOME_VIEW_PRODUCT).first().click();
    await page.locator(PRODUCT_DETAILS_ADD_TO_CART_BUTTON).click();

    await page.waitForTimeout(500);
    await page.locator(MODAL_VIEW_CART_LINK).click();

    await page.waitForTimeout(500);
    await page.locator(CART_REMOVE_PRODUCT).click();
    await expect(page.locator('text=Cart is empty!')).toBeVisible();

  });
});
