const { element } = require('protractor');

var ConfirmationPage = function () {

    var ConfirmationPageHeader = element(by.xpath("//div/h2"));
    var lblFacility = element(by.xpath("//*[@id='facility']"));
    var lblReadmission = element(by.xpath("//*[@id='hospital_readmission']"));
    var lblProgram = element(by.xpath("//*[@id='program']"));
    var lblDate = element(by.xpath("//*[@id='visit_date']"));
    var lblComment = element(by.xpath("//*[@id='comment']"));


    this.verifyConfirmationPageHeader = function (headerName) {

        expect(headerName).toBe(ConfirmationPageHeader.getText(), "Error..! : Confirmation page is invalid");
        return this;

    }

    this.verifyConfirmationPageDetails = function (facility,readmission,program,visitDate,comment) {
        expect(facility).toBe(lblFacility.getText(), "Error..! : Facility invalid");
        expect(readmission).toBe(lblReadmission.getText(), "Error..! : Readmission invalid");
        expect(program).toBe(lblProgram.getText(), "Error..! : Program invalid");
        expect(visitDate).toBe(lblDate.getText(), "Error..! : Visit Date invalid");
       // expect(facility).toBe(lblFacility.getText(), "Error..! : Facility invalid");
        expect(comment).toBe(lblComment.getText(), "Error..! : Comment invalid"); 
        return this;
    }

}

module.exports = new ConfirmationPage();

//except(element(by.id("facility")).getText().toBe("Hongkong CURA Healthcare Center", "Error.. : Facility invalid");