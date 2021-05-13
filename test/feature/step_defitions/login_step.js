const assert =require('assert')

const {
    Given,
    When,
    Then,
    Before,
    After,
    setDefaultTimeout
} = require("@cucumber/cucumber")

setDefaultTimeout(60 * 2000);


let webDriver = require('selenium-webdriver')
const until = require("selenium-webdriver/lib/until");

const {
    By,
    Key,
    Until
} = require("selenium-webdriver");



let driver


Before(async () => {

})


After(() => {
    if (driver) {
        driver.close()
    }
})

Given('the user has entered  {string} and {string}', async (email_type, password_type) => {
    await openSite()
    if (email_type == "correct email") {
        this.email = "#enter_correct phone"
    } else {
        this.email = "#put you wrong/email"
    }

    if (password_type == "correct password") {
        this.password = "enter_correct password"
    } else {
        this.password = "wrongpassword"
    }

    await login(this.email, this.password)

});



When('the user click login button', async () => {
    let LoginElement = await driver.findElement(By.name("logIn")).click()
});


Then('the user should {string}', async function (expectedAnswer) {
    this.actualAnswer = await validate()
    assert.equal(this.actualAnswer, expectedAnswer)
});


async function openSite() {
    driver = new webDriver.Builder().forBrowser('chrome').build()
    driver.get("https://www.sportybet.com/ke/sport/football/live_list")
}


async function login(email, password) {

    // console.log(email_type+"-------"+password)

    let phoneElement = await driver.findElement(By.name("phone"))
    await phoneElement.sendKeys(email)

    let passwordElement = await driver.findElement(By.name("psd"))
    await passwordElement.sendKeys(password)

}



async function validate() {

    let isloggedIn = true

    try {
        let LoginElement = await driver.findElement(By.id("j_balance"))

        await driver.wait(until.elementTextContains(LoginElement, "KES"), 1000)

        console.log()

        if (await LoginElement.getText() == "") {
            isloggedIn = false
        }


    } catch (error) {

        isloggedIn = false
    }

    if (isloggedIn) {
        return "logged in"
    }

    return "not logged in"

}