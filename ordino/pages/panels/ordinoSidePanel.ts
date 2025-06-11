import { expect } from '@playwright/test';
import { Page } from 'playwright';

import { oi } from '@ordino.ai/ordino-engine';

export class OrdinoSidePanel {
   
    private txt_search = "//input[@placeholder='Search']";
    private btn_menu = "//ul[@class='oxd-main-menu']//span"
    private headerTitle = ".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module";

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }    

    async step_searchOption() {
       await oi.ui(this.page).textBox(this.txt_search).enterText("Leave");
       await this.page.waitForTimeout(3000);
       await oi.ui(this.page).button(this.btn_menu).clickFirst();      
       return this;
    }

     async step_verifyHeaderText(value:string) {
       await oi.ui(this.page).label(this.headerTitle).assertText(value);       
       return this;
    }
    
}