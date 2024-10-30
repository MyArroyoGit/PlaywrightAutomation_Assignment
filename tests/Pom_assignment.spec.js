import{test,expect} from '@playwright/test'
import { LaunchingPage } from '../Pages/LaunchingPage'
import { BookRoom } from '../Pages/BookRoom';
import  {FormSubmit} from '../Pages/FormSubmit'

test("LauchingPage", async ({page})=>{

    //LaunchingPage
    const Launching = new LaunchingPage(page)
    await Launching.gotoLaunchingPage();
    await page.waitForTimeout(3000)
    await Launching.roomCheck();
    const bookingRoom = new BookRoom(page);
    //await bookingRoom.roomCheck();
    await bookingRoom.bookRoom();
    await page.waitForTimeout(3000);
})

    

test('FormSubmitValidData', async ({page})=>{
    await page.goto('https://automationintesting.online/')
    await page.waitForTimeout(3000)
    const formSubmit = new FormSubmit(page);
    await formSubmit.dataFillFormSubmit(
    'John Doe', 
            'john.doe@example.com', 
            '123456789012', 
            'Feedback', 
            'This is a valid message with more than 20 characters.'      
    )
    await formSubmit.validateFormSubmission();
})

test('FormSubmitInvalidData', async ({page})=>{
    await page.goto('https://automationintesting.online/')
    const formSubmit = new FormSubmit(page)
    await formSubmit.dataFillFormSubmit(
        '',      // Empty name
        'invalid-email', // Invalid email
        '123',   // Invalid phone number (too short)
        '',      // Empty subject
        '',      // Empty message
    );
    await formSubmit.validateErrorMessages();
})
    test('formSubmitInvalidData_Subject_Error', async ({ page }) => {
        await page.goto('https://automationintesting.online/')
        const formSubmit = new FormSubmit(page)
        await formSubmit.dataFillFormSubmit(
            'John Doe', 
            'john.doe@example.com', 
            '123456789012', 
            'Hi',  // Too short
            'Too short'  // Less than 20 characters
        );
        await formSubmit.validateErrorMessages();
    });
