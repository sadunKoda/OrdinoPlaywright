import { test } from '../../fixtures/pages';

test.describe('OrangeHRM Auth Sign-in - Test Suite', () => {

  test('Test - Auth Sign-in with Valid Credentials', async ({ loginPage, homePage }) => {
    await loginPage.goto()
    await loginPage.step_enterUsername("Admin")
    await loginPage.step_enterPassword("admin123")
    await loginPage.step_clickLogin() 
  });

  test('Test - Auth Sign-in with In-Valid Credentials', async ({ loginPage, homePage }) => {
    await loginPage.goto()
    await loginPage.step_enterUsername("Admin")
    await loginPage.step_enterPassword("wrongPassword")
    await loginPage.step_clickLogin()
  })

});
