import { Page } from "playwright";
import { HomePage } from "./ordinoHome.page";
import { oi } from '@ordino.ai/ordino-engine';

export class LoginPage {
    
    private txt_username = "input[name='username']";
    private txt_password = "input[name='password']";
    private btn_login = "button[type='submit']";
    private loc_userDropdown = '.oxd-userdropdown-tab';
    private loc_logoutOption = '.oxd-dropdown-menu li:last-child';
   
    page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }     
    
    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/');
        return this;
    }
   
    async step_enterUsername(username: string) {
        await oi.ui(this.page).textBox(this.txt_username).clickAndType(username);
        return this;
    }

    async step_enterPassword(password: string) {
        await oi.ui(this.page).textBox(this.txt_password).enterText(password);
        return this;
    }

    async step_clickLogin() {
        await oi.ui(this.page).button(this.btn_login).click();
        return new HomePage(this.page);
    }

     async step_logout() {
        await oi.ui(this.page).button(this.loc_userDropdown).click();
        // Wait for dropdown menu to appear
        await this.page.waitForTimeout(500);
        await oi.ui(this.page).button(this.loc_logoutOption).click();
        return new LoginPage(this.page);
    }
    

    
} 