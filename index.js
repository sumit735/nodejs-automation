const puppeteer = require('puppeteer');
const fs= require('fs');
const Tesseract = require('tesseract.js');
require('dotenv').config()

const username = process.env.PSA_USERNAME;
const password = process.env.PSA_PASSWORD;
const url = process.env.PSA_URL;
console.log(username, password);
let fileName = new Date().getTime();


const login = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto(url, {waitUntil: 'networkidle2'});
    let element = await page.$('#showLogin > table > tbody > tr:nth-child(8) > td > img');
    await element.screenshot({path: `./uploads/${fileName}.png`});
    fs.readFile(`./uploads/${fileName}.png`, async (err, data) => {
        if(err) return console.log('Something Went Wrong', err);

        Tesseract.recognize(data,'eng').then( async ({ data: { text } }) => {
            if(text == '' || text == null || text == undefined) {
                return console.log('404 error');
            }
            let captcha = text;
            console.log(captcha);
            await page.type('input[name=userId]', username, {delay: 100});
            await page.type('input[name=password]', password, {delay: 100});
            await page.type('input[name=j_captcha_response]', captcha, {delay: 100});
            await page.keyboard.press('Enter');
            console.log('New Page URL:', page.url());
            if(page.url() === 'https://www.psaonline.utiitsl.com/psaonline/PsaLoginAction') {
                console.log('Loggedin Successfully');
                console.log('New Page URL:', page.url());
                await page.goto('https://www.psaonline.utiitsl.com/psaonline/logoutPsa', {waitUntil: 'networkidle2'});
            } else {
                console.log('In Same Page, rerun browser');
                browser.close();
                login();
            }
            
            // Delete images if required
            // fs.unlink(`./uploads/${fileName}.png`, (err, data) => {
            //     console.log(`${fileName}.png Deleted Successfully`);
            // });
        });
   });
//   await browser.close();
};

login();