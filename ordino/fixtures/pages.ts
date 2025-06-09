import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/orangehrm-login.page';
import { HomePage } from '../pages/orangehrm-dashboard.page';



// Declare the types of fixtures
type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

// Extend the base test with our fixtures
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

// Export the page fixtures
export { expect } from '@playwright/test'; 