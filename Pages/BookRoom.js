import { test, expect } from '@playwright/test';

export class BookRoom {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('.form-control.room-firstname');
    this.lastNameInput = page.locator('.form-control.room-lastname');
    this.emailInput = page.locator('.form-control.room-email');
    this.phoneInput = page.locator('.form-control.room-phone');
    this.page.waitForSelector('.btn.btn-outline-primary.float-right.book-room'); 
    this.bookButton = page.locator('.btn.btn-outline-primary.float-right.book-room');
    //this.page.waitForSelector('//button[normalize-space()="Cancel"]')
   // this.cancelBook = page.locator('//button[normalize-space()="Cancel"]');
  }

  async bookRoom() {
    await this.page.waitForTimeout(3000);
    await this.firstNameInput.fill('Panchagnula');
    await this.lastNameInput.fill('krishnaKishore');
    await this.emailInput.fill('kk_tera@yahoo.com');
    await this.phoneInput.fill('903232242923');
    await this.page.waitForTimeout(4000);
    await this.bookButton.hover();
    await this.page.evaluate(() => {
            const scrolldown = document.querySelector('#submitContact');
            scrolldown.scrollIntoView()
          })
    await this.bookButton.click();
    const validation1 = this.page.locator('//div[@class="col-sm-4"]//p[1]');
    await expect(validation1).toContainText('must not be null');
    const validation2 = this.page.locator('//div[@class="col-sm-4"]//p[1]');
    await expect(validation2).toContainText('must not be null');
    await this.page.waitForTimeout(3000)
    await this.page.goto('https://automationintesting.online/')
    //await this.page.waitForTimeout(2000);
    //await this.bookButton.click();
  }
}