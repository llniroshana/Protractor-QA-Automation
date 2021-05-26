var PerformOnScreen = function () {

    var protractorImageComparison = require('protractor-image-comparison');
    var hotkeys = require('protractor-hotkeys');
    var HashMap = require('hashmap');
    var hashMap = new HashMap();

    var ELEMENT_TIME_OUT = 30000;

    this.CaptureScreenshot = function () {
        browser.takeScreenshot().then(function (png) {
            allure.createAttachment('Screenshot', function () {
                return new Buffer(png, 'base64')
            }, 'image/png')();
        });
    }

    this.Open = function (url) {
        browser.ignoreSynchronization = true;
        browser.get(url);
		browser.waitForAngularEnabled(false);
    }

    this.CloseBrowser = function () {
        browser.close();
    }

    // Browser refresh
    this.BrowserRefresh = function () {
        browser.waitForAngular();
        browser.navigate().refresh();
    }

    // Browser Back
    this.BrowserBack = function () {
        browser.navigate().back();
    }

    // Browser Forward
    this.BrowserForward = function () {
        browser.navigate().forward();
    }

    // Memorize Values
    this.Memorize = function (key, value) {
        hashMap.set(key, value);
    }

    // Recall Values
    this.Recall = function (key) {
        var value = hashMap.get(key);
        console.log(value);
        return value;
    }

    // Get Current Date
    this.GetCurrentDate = function () {
        var date = new Date();
        var today = date.getDate();
        return today;
    }

    // Get Current Month
    this.GetCurrentMonth = function () {
        var date = new Date();
        var month = date.getMonth() + 1;
        return month;
    }

    // Get Current Year
    this.GetCurrentYear = function () {
        var date = new Date();
        var year = date.getFullYear();
        return year;
    }

    // Navigate To Element
    this.NavigateToElement = function (uiElement) {
        browser.executeScript("arguments[0].scrollIntoView(true);", uiElement.getWebElement());
    }

    // Wait for progress icon dismiss
    this.WaitToDismissLoadIcon = function () {
        browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.xpath("// img[contains(@src,'loading.svg')]"))), ELEMENT_TIME_OUT, "Element didn't load within " + ELEMENT_TIME_OUT + " seconds").then(function () {
            console.log("Spinner presents");
        });

        let loader = element(by.xpath("// img[contains(@src,'loading.svg')]"));
        let EC = protractor.ExpectedConditions;

        browser.wait(EC.invisibilityOf(loader), 10000);
    }

    // Press given key set
    this.KeyBoardPress = function (keySet) {
        hotkeys.trigger(keySet);
    }

    // Press given key set
    this.KeyBoardSendKeys = function (keySet) {
        switch (keySet) {
            case "enter":
                browser.actions().sendKeys(protractor.Key.ENTER).perform();
                break;
            case "tab":
                browser.actions().sendKeys(protractor.Key.TAB).perform();
                break;
            case "shift tab":
                browser.actions().sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.TAB)).perform();
                break;
            case "delete":
                browser.actions().sendKeys(protractor.Key.DELETE).perform();
            case "Esc":
                browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        }
    }

    // Check element Precent by XPath
    this.CheckElementPresentByXpath = function (xpath) {
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(element(by.xpath(xpath))), 5000, "Time Out Error " + ELEMENT_TIME_OUT + " milliseconds");

        if (element(by.xpath(xpath)).isPresent()) {
            element(by.xpath(xpath)).isPresent().then(function (isVisible) {
                expect(isVisible).toBe(true);
            });
        }
    }

    // Scroll To Element
    this.ScrollToElement = function (uielement) {
        uielement.isPresent().then(isPresent => {
            if (isPresent) {
                expect(isPresent).toBe(true);
                browser.executeScript("arguments[0].scrollIntoView(true);", uielement.getWebElement());
            } else {
                browser.executeScript("arguments[0].scrollIntoView(true);", uielement.getWebElement());
                expect(uielement.isPresent()).toBe(true);
            }
        }, err => {
            console.log('Error: Element not found after scrolling!', err);
        });
    }

    // Check Element Present
    this.CheckElementPresent = function (uielement) {
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(uielement), ELEMENT_TIME_OUT, "Time Out Error: Element not precence of " + ELEMENT_TIME_OUT + " milliseconds");
        uielement.isPresent().then(function (isVisible) {
            expect(isVisible).toBe(true);
        });
    }

    // Check Element Clickable
    this.CheckElementClickable = function (uielement) {
        browser.executeScript("arguments[0].scrollIntoView(true);", uielement.getWebElement());
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(uielement), ELEMENT_TIME_OUT, "Time Out Error: Element not precence of " + ELEMENT_TIME_OUT + " milliseconds");
        browser.wait(until.elementToBeClickable(uielement), ELEMENT_TIME_OUT, "Time Out Error: Element not clickable of " + ELEMENT_TIME_OUT + " milliseconds").then(function () {
            console.log("Element is clickable");
        });
        uielement.isPresent().then(function (isVisible) {
            expect(isVisible).toBe(true);
        });
    }

    // Check Message Pop Up
    this.CheckMessagePopUp = function name(message) {
        var uielement = element(by.xpath("// div[contains(text(),'" + message + "')]"));

        browser.wait(protractor.ExpectedConditions.elementToBeClickable(uielement), ELEMENT_TIME_OUT, "Time Out Error " + ELEMENT_TIME_OUT + " milliseconds").then(function () {
            console.log("Message is Displayed");
        });
        uielement.isPresent().then(function (isVisible) {
            expect(isVisible).toBe(true);
        });
    }

    // Type text on given element
    this.Type = function (uielement, texttotype) {
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(uielement), ELEMENT_TIME_OUT, "Time Out Error " + ELEMENT_TIME_OUT + " milliseconds");

        if (texttotype == null) {
            uielement.isDisplayed().then(function (isVisible) {
                expect(isVisible).toBe(true);
                uielement.clear();
                console.log("Cleared the text");
            });
        } else {
            uielement.isDisplayed().then(function (isVisible) {
                expect(isVisible).toBe(true);
                uielement.clear();
                uielement.sendKeys(texttotype);
                console.log("Typed On Element");
            });
        }
    }

    // Clear the text filed
    this.Clear = function (uielement) {
        uielement.clear();
    }

    // Type text without clear the element
    this.EnterText = function (uielement, texttotype) {
        uielement.isDisplayed().then(function (isVisible) {
            expect(isVisible).toBe(true);
            uielement.sendKeys(texttotype);
            console.log("Typed On Element");
        });
    }

    // wait for given time
    this.pause = function (pausetimestamp) {
        browser.sleep(pausetimestamp);
    }

    // Click the element
    this.Click = function (uielement) {
        uielement.isDisplayed().then(function (isVisible) {
            var until = protractor.ExpectedConditions;
            browser.wait(until.presenceOf(uielement), ELEMENT_TIME_OUT, "Time Out Error: Element does not presence after " + ELEMENT_TIME_OUT + " milliseconds");
            browser.wait(until.elementToBeClickable(uielement), ELEMENT_TIME_OUT, "Time Out Error: Element cannot clickable after " + ELEMENT_TIME_OUT + " milliseconds");

            expect(isVisible).toBe(true);
            browser.executeScript("arguments[0].scrollIntoView(true);", uielement.getWebElement());
            uielement.click();
            console.log("Clicked On Element");
        });
    }

    // Mouse Move And Click
    this.MouseMoveAndClick = function (uielement) {
        uielement.isDisplayed().then(function (isVisible) {
            // browser.sleep(5000);
            expect(isVisible).toBe(true);
            browser.actions().mouseMove(uielement).click().perform();
            // browser.sleep(2000);
            console.log("Mouse Moved And Clicked On Element");
        });
    }

    // Drag Scroll Bar
    this.DragScrollBar = function (uielement) {
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(uielement), ELEMENT_TIME_OUT, "Time Out Error: Element does not presence after " + ELEMENT_TIME_OUT + " milliseconds");
        browser.actions().dragAndDrop(uielement, { x: -2000, y: 0 }).perform();
    }

    // Cleat text field
    this.Clear = function (uielement) {
        uielement.isDisplayed().then(function (isVisible) {
            expect(isVisible).toBe(true);
            uielement.clear();
            // browser.sleep(2000);
            console.log("Text Filed Cleared");
        });
    }

    // Check Element Not Present
    this.CheckElementNotPresent = function (uielement) {
        uielement.isPresent().then(function (isVisible) {
            console.log("Element is not present as expected");
            expect(false).toBe(isVisible);
        });
    }

    // Double Click on element
    this.DoubleClick = function (uielement) {
        uielement.isDisplayed().then(function (isVisible) {
            expect(isVisible).toBe(true);
            browser.actions().doubleClick(uielement).perform();
            console.log("Double Clicked On Element");
        });
    }

    // Check Object Property Without Spaces
    this.CheckObjectPropertyWithoutSpaces = function (uielement, propertyName, expected) {
        var noSpacesExpected = expected.replace(/\s/g, '');
        if (propertyName.toLowerCase() == "text") {
            uielement.getText().then(function (value) {
                var value = value.replace(/\s/g, '');
                expect(noSpacesExpected).toBe(value, "Object property not found as expected");
                console.log("Object property found as expected");
            });
        }
        else {
            uielement.getAttribute(propertyName).then(function (value) {
                var value = value.replace(/\s/g, '');
                expect(noSpacesExpected).toBe(value, "Object property not found as expected");
                console.log("Object property found as expected");
            });
        }
    }

    // Check Object Property
    this.CheckObjectProperty = function (uielement, propertyName, expected) {
        if (propertyName.toLowerCase() == "text") {
            uielement.getText().then(function (value) {
                expect(expected).toBe(value, "Object property not found as expected");
                console.log("Object property found as expected");
            });
        }
        else {
            uielement.getAttribute(propertyName).then(function (value) {
                expect(expected).toBe(value, "Object property not found as expected");
                console.log("Object property found as expected");
            });
        }

    }

    // Check Object Property Contains
    this.CheckObjectPropertyContains = function (uielement, propertyName, expected) {
        if (propertyName.toLowerCase() == "text") {
            uielement.getText().then(function (value) {
                expect(value).toContain(expected, "Object property not found as expected");
                console.log("Object property found as expected");
            });
        }
        else {
            uielement.getAttribute(propertyName).then(function (value) {
                expect(value).toContain(expected, "Object property not found as expected");
                console.log("Object property found as expected");
            });
        }

    }

    // Take And Save Screenshot
    this.TakeAndSaveScreenshot = function () {
        protractorImageComparison.saveScreen('imgTitle');
    }

    // Check Taken Screenshot
    this.CheckTakenScreenshot = function () {
        expect(protractorImageComparison.checkScreen('imgTitle')).toEqual(0);
    }

    // Mouse Hover
    this.MouseHover = function (uielement) {
        uielement.isDisplayed().then(function (isVisible) {
            expect(isVisible).toBe(true);
            browser.actions().mouseMove(uielement).perform();
            // browser.sleep(5000);
            console.log("Mouse Hover On Element");
        });
    }

    // Close Current Tab
    this.CloseCurrentTab = function () {
        browser.getAllWindowHandles().then(function (handles) {
            browser.driver.switchTo().window(handles[1]);
            browser.driver.close();
            browser.driver.switchTo().window(handles[0]);
        });
    }

    // Remove Spaces in the String and Return
    this.RemoveSpaces = function (string) {
        string = string.replace(/\s/g, '');
        return string;
    }
    // Change Window Handler
    this.ChangeWindowHandler = function () {
        browser.getAllWindowHandles().then(function (handles) {
            var count = handles.length;
            var newWindow = handles[count - 1];
            browser.switchTo().window(newWindow);
        });
    }

    // Change Focus To Given Window
    this.ChangeFocusToGivenWindow = function (windowNo) {
        browser.getAllWindowHandles().then(function (handles) {
            var count = handles.length;
            expect(count).toBeGreaterThanOrEqual(windowNo);
            var newWindow = handles[Number(windowNo) - 1];
            browser.switchTo().window(newWindow);
        });
    }

    // Check The Redirection Tab URL
    this.CheckTheRedirectionTabURL = function (url) {
        browser.getAllWindowHandles().then(function (handles) {
            newWindowHandle = handles[1];
            browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.getCurrentUrl()).toMatch(url);
            });
        });
    }
}

module.exports = new PerformOnScreen();