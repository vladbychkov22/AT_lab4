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

        await driver.findElement(By.linkText('T-shirts')).click();

        await driver.findElement(By.linkText('Faded Short Sleeve T-shirts')).click();

        await driver.findElement(By.name('Add to cart')).click();

        await driver.findElement(By.css('button.checkout')).click();

        let productName = await driver.findElement(By.css('div.cart_item label.product-name')).getText();
        if (!productName.includes('Faded Short Sleeve T-shirts')) {
            throw new Error('Неправильна назва товару в корзині.');
        }

        let price = await driver.findElement(By.css('span.price')).getText();
        console.log('Ціна товару:', price);

        await driver.findElement(By.css('input.qty')).clear();
        await driver.findElement(By.css('input.qty')).sendKeys('2', Key.RETURN);

        let totalPrice = await driver.findElement(By.css('span.total-price')).getText();
        let expectedTotal = parseFloat(price.replace('$', '')) * 2;
        if (parseFloat(totalPrice.replace('$', '')) !== expectedTotal) {
            throw new Error('Загальна вартість не відповідає очікуваній.');
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
