import{test,expect} from '@playwright/test'

exports.FormSubmit =
class FormSubmit{

    constructor(page)
    {
        this.page = page;
        this.nameInput = page.locator('//input[@id="name"]');
        this.emailInput = page.locator('//input[@id="email"]');
        this.phoneNumInput = page.locator('//input[@id="phone"]');
        this.subjectInput = page.locator('//input[@id="subject"]')
        this.messageInput = page.locator('//textarea[@id="description"]')   
        this.FormSubmit = page.locator('#submitContact'); 

        this.nameError = page.locator('//p[normalize-space()="Name may not be blank"]');
        
        this.emailErrorBlank = page.locator('//p[normalize-space()="Email may not be blank"]');
        this.emailErrorLength = page.locator('//p[normalize-space()="must be a well-formed email address"]');//

        this.phonErrorBlank = page.locator('//p[normalize-space()="Phone may not be blank"]')
        this.phoneErrorLength = page.locator('//p[normalize-space()="Phone must be between 11 and 21 characters."]')

        this.subjectErrorBlank = page.locator('//p[normalize-space()="Subject may not be blank"]');//
        this.subjectErrorSize = page.locator('//p[normalize-space()="Subject must be between 5 and 100 characters."]')
   
        this.messageErrorBlank = page.locator('//p[normalize-space()="Message may not be blank"]');
        this.messageErrorLength = page.locator('//p[normalize-space()="Message must be between 20 and 2000 characters."]');
        this.successMessage =page.locator('//h2[normalize-space()="Thanks for getting in touch John Doe!"]');
    }
//valid data submission
    async dataFillFormSubmit(name,email,phonenumber,subject, message){
        
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.phoneNumInput.fill(phonenumber);
        await this.messageInput.fill(message);
        await this.subjectInput.fill(subject);
        await this.page.waitForTimeout(4000);
        /*await this.page.evaluate(() => {
            const FormSubmit = document.querySelector('#submitContact');
            FormSubmit.scrollIntoView()
          });*/
        await this.FormSubmit.click();
    }
    async validateFormSubmission(){
    this.page.waitForSelector('//h2[normalize-space()="Thanks for getting in touch John Doe!"]');
    await expect(this.successMessage).toContainText('Thanks for getting in touch John Doe!');
   // await expect(this.page.locator('//h2[normalize-space()="Thanks for getting in touch kishore!"]')).toBeVisible();
    await this.page.waitForTimeout(3000)
    }
    
   
    //Invalid data submission
    async validateErrorMessages() {
        //NameErrorValidation
        if (await this.nameError.isVisible()) {
            await expect(this.nameError).toContainText("Name may not be blank");
        }
        //EmailErrorValidation
        if(await this.emailErrorBlank.isVisible())
            {
                await expect(this.emailErrorBlank).toContainText("Email may not be blank");
            }
        if (await this.emailErrorLength.isVisible()) {
            await expect(this.emailErrorLength).toContainText("must be a well-formed email address");
        }
        //phoneNumber validation
        if (await this.phonErrorBlank.isVisible()) {
            await expect(this.phonErrorBlank).toContainText("Phone may not be blank");
        }
        if (await this.phoneErrorLength.isVisible()) {
            await expect(this.phoneErrorLength).toContainText("Phone must be between 11 and 21 characters");
        }
        
        //SubjectError Validation
        if(await this.subjectErrorBlank.isVisible())
        {
            await expect(this.subjectErrorBlank).toContainText('Subject may not be blank');
        }
        if (await this.subjectErrorSize.isVisible()) {
            await expect(this.subjectErrorSize).toContainText("Subject must be between 5 and 100 characters.");
        }
        //MessageError Validation
        if (await this.messageErrorBlank.isVisible()) {
            await expect(this.messageErrorBlank).toContainText("Message may not be blank");
        }
        if (await this.messageErrorLength.isVisible()) {
            await expect(this.messageErrorLength).toContainText("Message must be between 20 and 2000 characters.");
        }

        await this.page.waitForTimeout(3000)
    }
}