import { test } from '../../fixtures/pages';

test.describe('OrangeHRM Home Dashboard - Test Suite', () => {

    test('Test - Verify Profile Logout', async ({ loginPage, homePage }) => {
        await loginPage.goto();
        await loginPage.step_enterUsername("Admin");
        await loginPage.step_enterPassword("admin123");
        await loginPage.step_clickLogin();           
        await homePage.step_profileOption("Logout");
    });

    test("Test - Verify Given Menu Search Selection", async ({ loginPage, homePage, sidePanel }) => {
        await loginPage.goto();
        await loginPage.step_enterUsername("Admin");
        await loginPage.step_enterPassword("admin123");
        await loginPage.step_clickLogin();
        await sidePanel.step_searchOption();        
        await homePage.step_profileOption("Logout");
    });
    
});