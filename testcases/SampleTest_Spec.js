const LandingPage = require('../pom/pages/LandingPage');
const GlobalData = require('../GlobalVariables');
const ConfirmationPage = require('../pom/pages/ConfirmationPage.js');
const { element } = require('protractor');
const LoginPage = require('../pom/pages/LoginPage');
const { UserName, Password } = require('../GlobalVariables');
const AppointmentPage = require('../pom/pages/AppointmentPage');


describe("Make an Appointment", function () {

    beforeEach = function () {
        LandingPage.NagivateToCuraWebSite(GlobalData.baseURL);
    }

    it("Verify the appointment details", function () {


        LandingPage
            .VerifyTheHeaderOfLandingPage(GlobalData.LangingPageHeader)
            .ClickToMakeAppointment()
            .VerifyLoginHeader(GlobalData.LoginPageHeader)
            .LoginToCura(GlobalData.UserName, GlobalData.Password)
            .VerifyAppointmentPageHeader(GlobalData.MakeAppointmentPageHeader)
            .makeAppoinment(GlobalData.programe,false,GlobalData.radbtn,GlobalData.appDate,GlobalData.appComment)
            .verifyConfirmationPageHeader(GlobalData.AppointmantConfirmationPageHeader)
            .verifyConfirmationPageDetails(GlobalData.programe,"No",GlobalData.radbtn,GlobalData.appDate,GlobalData.appComment);
           // .verifyConfirmationPageDetails(GlobalData.programe, "No", GlobalData.radbtn, GlobalData.appDate, GlobalData.appComment);
            








        /* LandingPage.VerifyTheHeaderOfLandingPage(GlobalData.LangingPageHeader)
        LandingPage.ClickToMakeAppointment()
        LoginPage.VerifyLoginHeader(GlobalData.LoginPageHeader);
        LoginPage.LoginToCura(GlobalData.UserName,GlobalData.Password); */
        /* AppointmentPage.VerifyAppointmentPageHeader(GlobalData.MakeAppointmentPageHeader);
        AppointmentPage.makeAppoinment(GlobalData.programe,false,GlobalData.radbtn,GlobalData.appDate,GlobalData.appComment);
        ConfirmationPage.verifyConfirmationPageHeader(GlobalData.AppointmantConfirmationPageHeader);
        ConfirmationPage.verifyConfirmationPageDetails(GlobalData.programe,"No",GlobalData.radbtn,GlobalData.appDate,GlobalData.appComment); */

    });



});