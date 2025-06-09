import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { LoginPage } from './orangehrm-login.page';
import { oi } from '@ordino.ai/ordino-engine';

export class HomePage {
    // Element locators
    private loc_profileName = 'p.oxd-userdropdown-name';
    private loc_dashboardHeader = '.oxd-topbar-header-breadcrumb';
    private loc_userDropdown = '.oxd-userdropdown-tab';
    private loc_logoutOption = '.oxd-dropdown-menu li:last-child';
    private loc_dashboardMenu = '.oxd-main-menu-item:nth-child(8)';
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyProfileName() {
        await expect(this.page.locator(this.loc_profileName)).toBeVisible();
        return this;
    }

    async verifyDashboardIsVisible() {
        await expect(this.page.locator(this.loc_dashboardHeader)).toBeVisible();
        return this;
    }
    
    async logout() {
        await oi.ui(this.page).button(this.loc_userDropdown).click();
        // Wait for dropdown menu to appear
        await this.page.waitForTimeout(500);
        await oi.ui(this.page).button(this.loc_logoutOption).click();
        return new LoginPage(this.page);
    }

    async navigateToDashboard() {
        await this.page.locator(this.loc_dashboardMenu).click();
        return this;
    }
} 