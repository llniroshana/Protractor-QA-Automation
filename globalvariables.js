function globalvariables () {

	// Environment Details
	//********************* Dev Env ********************//
	this.baseURL = "https://katalon-demo-cura.herokuapp.com/";

	this.UserName = "John Doe"
	this.Password = "ThisIsNotAPassword"

	this.programe = "Seoul CURA Healthcare Center"
	this.radbtn ="None"
	this.appDate = "01/09/2020"
	this.appComment="Test Comment"

	this.LangingPageHeader = "CURA Healthcare Service"
	this.LoginPageHeader = "Login"
	this.MakeAppointmentPageHeader = "Make Appointment"
	this.AppointmantConfirmationPageHeader = "Appointment Confirmation"
	
}
module.exports = new globalvariables();