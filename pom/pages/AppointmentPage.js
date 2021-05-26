const { element } = require('protractor');
var BasePage = require('../../Utility/BasePage');

var AppointmentPage = function () {

    var AppointmentPageHeader = element(by.xpath("//div/h2"));
    // var lblFacility = element(by.xpath("//option[@value='Hongkong CURA Healthcare Center']"));
    var lblChk = element(by.xpath("//*[@id='chk_hospotal_readmission']"));
    //var btnRadioMedi = element(by.xpath("//input[@value ='None']"));
    var txtVisit = element(by.xpath("//*[@id= 'txt_visit_date']"));
    var txtComment = element(by.xpath("//*[@id= 'txt_comment']"));
    var btnAppoinment = element(by.xpath("//*[@id= 'btn-book-appointment']"));

    var lblFacility = function (program) {

        return element(by.xpath("//option[@value='" + program + "']"));

    }

    var btnRadioMedi = function (selection) {

        return element(by.xpath("//input[@value ='" + selection + "']"));
    }

    this.VerifyAppointmentPageHeader = function (headerName) {

        expect(headerName).toBe(AppointmentPageHeader.getText(), "Error..! : Appoinment page header not matched");
        return this;
    }

    this.makeAppoinment = function (Fctpragram, isChk, SelectHealthPro, visitDate, comment) {

        BasePage.Click(lblFacility(Fctpragram));
        BasePage.Click(btnRadioMedi(SelectHealthPro));
        if (isChk) {
            BasePage.Click(lblChk);
        }
        // BasePage.Click(btnRadioMedi);
        BasePage.Type(txtVisit, visitDate);
        BasePage.Type(txtComment, comment);
        BasePage.Click(btnAppoinment);
        return require ('../pages/ConfirmationPage');

    }
}

module.exports = new AppointmentPage();