import { test } from '../../fixtures/pages';

test.describe('Checkout Process', () => {
  test('OrangeHRM Login Success', async ({ loginPage, homePage }) => {
    await loginPage.goto()
    await loginPage.enter_username("Admin")
    await loginPage.enter_password("admin123")
    await loginPage.click_login()
    await homePage.verifyProfileName()
    await homePage.verifyDashboardIsVisible()
    await homePage.logout();
  });
});
