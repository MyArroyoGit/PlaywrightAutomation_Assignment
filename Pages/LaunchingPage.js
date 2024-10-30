
import{expect,test} from '@playwright/test'
exports.LaunchingPage = class LaunchingPage {
    constructor(page) {
        this.page = page;
        this.bookRoom = '.btn.btn-outline-primary.float-right.openBooking';  
    }

    async gotoLaunchingPage() {
        try {
            await this.page.goto("https://automationintesting.online/");
            await expect(this.page).toHaveTitle("Restful-booker-platform demo");
        } catch (error) {
            console.error("Navigation error:", error);
            throw error;
        }
    }

    async roomCheck() {
        
        const bookRoomButton = this.page.locator(this.bookRoom).first(); 
        await bookRoomButton.waitFor({ state: 'visible' });
        await bookRoomButton.hover();
        await this.page.waitForTimeout(3000);
        await bookRoomButton.click();
    }
};