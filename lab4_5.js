const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

async function runTest() {
    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new firefox.Options())
        .build();

    try {
        await driver.get('https://automationexercise.com/');
        await driver.findElement(By.id('email')).sendKeys('test@example.com');
        await driver.findElement(By.id('password')).sendKeys('your_password', Key.RETURN);
        await driver.wait(until.titleIs('Your Account'), 5000);

        await driver.findElement(By.id('search_query_top')).sendKeys('Printed Chiffon Dress', Key.RETURN);

        await driver.wait(until.elementLocated(By.linkText('Printed Chiffon Dress')), 5000);
        let productName = await driver.findElement(By.linkText('Printed Chiffon Dress')).getText();
        console.log("Знайдений товар:", productName);
        if (productName !== 'Printed Chiffon Dress') {
            throw new Error('Назва товару не відповідає очікуваному.');
        }

        let discount = await driver.findElement(By.css('span.discount')).getText();
        if (!discount.includes('20%')) {
            throw new Error('Знижка на товар не відповідає очікуваній 20%.');
        }

        console.log('Тест пройшов успішно.');

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        console.log('Тест завершено, браузер закривається.');
        await driver.quit();
    }
}

runTest();
