const {Builder, By, Key, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

async function runTest() {
    let options = new firefox.Options();
    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();

    try {
        await driver.get('https://automationexercise.com/');
        await driver.findElement(By.css('a[href="/login"]')).click();
        await driver.wait(until.titleIs('Automation Exercise - Signup / Login'), 5000);
        await driver.findElement(By.id('email')).sendKeys('andrea@gmail.com');
        await driver.findElement(By.id('passwd')).sendKeys('teststst1', Key.RETURN);
        await driver.wait(until.titleIs('Automation Exercise'), 5000);

        let userName = await driver.findElement(By.css('#header > div > div > div > div.col-sm-8 > div > ul > li:nth-child(10) > a > b')).getText();
        console.log("Юзер :", userName);
        if (!userName.includes('Andrii')) {
            throw new Error("Ім'я користувача не відповідає очікуваному.");
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        console.log('Все добре тут вихід.');
        await driver.quit();
    }
}

runTest();
