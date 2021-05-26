const { element, browser } = require('protractor');
var BasePage = require('../../Utility/BasePage');

var LandingPage = function () {
    var lblPageHeader = element(by.xpath("//*[@id='top']/div/h1"));
    var btnMakeAppintment = element(by.id('btn-make-appointment'));

    this.NagivateToCuraWebSite = function (baseURL) {
        BasePage.Open(baseURL);
    }

    this.VerifyTheHeaderOfLandingPage = function (headerName) {
        expect(headerName).toBe(lblPageHeader.getText(), "Error..! : Landing page header not matched");
        return this;

    }

    this.ClickToMakeAppointment = function(){

        BasePage.Click(btnMakeAppintment);
        return require ('../pages/LoginPage');
    }
}

module.exports = new LandingPage();