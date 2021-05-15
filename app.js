// const puppeteer = require('puppeteer');
// const fs= require('fs');


// (async () => {
//   const browser = await puppeteer.launch({headless: false});
//   const page = await browser.newPage();
//   await page.goto('https://twitter.com/explore/tabs/for-you');
//   let element = await page.$('#showLogin > table > tbody > tr:nth-child(8) > td > img');
//   await element.screenshot({path: './uploads/example.png'});
//   fs.readFile(`./uploads/example.png`, (err, data) => {
//     if(err) return console.log('Something Went Wrong', err);

//     Tesseract
//     .recognize(
//         data,
//         'eng'
//     ).then(({ data: { text } }) => {
//         if(text == '' || text == null || text == undefined) {
//             return console.log('404 error');
//         }
        
//         console.log(text);
//     });
//  });
// //   await browser.close();
// })();

const fs= require('fs');
const Tesseract = require('tesseract.js');

fs.readFile(`./newtest/3.jpg`, async (err, data) => {
    if(err) return console.log('Something Went Wrong', err);

    Tesseract.recognize(data,'eng').then( async ({ data: { text } }) => {
        if(text == '' || text == null || text == undefined) {
            return console.log('404 error');
        }
        let captcha = text;
        console.log(captcha);
        // await page.type('input[name=userId]', username, {delay: 100});
        // await page.type('input[name=password]', password, {delay: 100});
        // await page.type('input[name=j_captcha_response]', captcha, {delay: 100});
        // await page.keyboard.press('Enter');
        // console.log('New Page URL:', page.url());
        // if(page.url() === 'https://www.psaonline.utiitsl.com/psaonline/PsaLoginAction') {
        //     console.log('Loggedin Successfully');
        //     console.log('New Page URL:', page.url());
        //     await page.goto('https://www.psaonline.utiitsl.com/psaonline/logoutPsa', {waitUntil: 'networkidle2'});
        // } else {
        //     console.log('In Same Page, rerun browser');
        //     browser.close();
        //     login();
        // }
        
        // Delete images if required
        // fs.unlink(`./uploads/${fileName}.png`, (err, data) => {
        //     console.log(`${fileName}.png Deleted Successfully`);
        // });
    });
});