const { ExpectedConditions } = require("protractor");
const { element, browser } = require('protractor');
const { UserName } = require("../../GlobalVariables");
var BasePage = require('../../Utility/BasePage');

var LoginPage = function () {

    var lblLoginHeader = element(by.xpath("//div/h2"));
    var txtUserName = element(by.id("txt-username"));
    var txtPassword = element(by.id("txt-password"));
    var btnLogin = element(by.id("btn-login"));

    this.VerifyLoginHeader = function (headerName){

        expect(headerName).toBe(lblLoginHeader.getText(), "Error..! : Login page header not matched");
        return this;
    }

    this.LoginToCura = function (username, password) {

        BasePage.Type(txtUserName, username);
        BasePage.Type(txtPassword, password);
        BasePage.Click(btnLogin);
        return require ('../pages/AppointmentPage');
        
    }

    
}

module.exports = new LoginPage();