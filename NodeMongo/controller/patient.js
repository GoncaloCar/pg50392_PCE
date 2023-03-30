let PatientSchema = require("../model/patient");

module.exports.newPatientSchema = async (patientid, patientname, patientbirthdate, patientage) =>{
    try{
        let patient = new PatientSchema({patientid: patientid, 
            patientname:patientname, 
            patientbirthdate:patientbirthdate,
        patientage:patientage})
        let response = await patient.save();
        console.log(response);
        return{success: true, response};
    }catch(err) {
        console.log(err);
        return{success: false, response: err}
    }
}