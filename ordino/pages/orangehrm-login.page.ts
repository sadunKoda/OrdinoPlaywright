import { Page } from "playwright";
import { HomePage } from "./orangehrm-dashboard.page";
import { oi } from '@ordino.ai/ordino-engine';

export class LoginPage {
    // Element locators
    private txt_username = "input[name='username']";
    private txt_password = "input[name='password']";
    private btn_login = "button[type='submit']";
    page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    // Method to match the pattern in the screenshot
    async navigate() {
        return this.goto();
    }
    
    // Method to match the pattern in the screenshot
    async login(username: string, password: string) {
        await this.enter_username(username);
        await this.enter_password(password);
        return this.click_login();
    }
    
    async enter_username(username: string) {
        await oi.ui(this.page).textBox(this.txt_username).clickAndType(username);
        return this;
    }

    async enter_password(password: string) {
        await oi.ui(this.page).textBox(this.txt_password).enterText(password);
        return this;
    }

    async click_login() {
        await oi.ui(this.page).button(this.btn_login).click();
        return new HomePage(this.page);
    }

    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/');
        return this;
    }
} 