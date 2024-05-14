const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

async function runTest() {
    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new firefox.Options())
        .build();

    try {
        await driver.get('https://automationexercise.com/');
        
        await driver.findElement(By.css('a[href="/login"]')).click();
        
        await driver.wait(until.titleIs('Automation Exercise - Signup / Login'), 5000);
        
        await driver.findElement(By.name('email')).sendKeys('test@example.com');
        
        await driver.findElement(By.name('password')).sendKeys('');
        await driver.findElement(By.css('button[type="submit"]')).click();
        
        let errorMessage = await driver.findElement(By.css('.error-messages')).getText();
        console.log("Отримане повідомлення:", errorMessage);
        if (errorMessage.includes('Password is required')) {
            console.log('Тест пройшов успішно: повідомлення про необхідність введення пароля відображається.');
        } else {
            console.log('Тест не пройшов: повідомлення про необхідність введення пароля не знайдено.');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        console.log('Тест завершено, браузер закривається.');
        await driver.quit();
    }
}

runTest();