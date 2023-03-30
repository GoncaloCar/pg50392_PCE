
//let ClinicalInfoSchema = require("../model/clinicalinfo");

//module.exports.newClinicalInfo(clinicalinfoID, admDate, bed, bodyTemp, bpm, diastolic, systolic, sato2, timestamp)
//try{
//let bloodpress = {systolic: systolic, diastolic: diastolic};
//let clinicalinfo = new ClinicalInfoSchema({
    //clinicalinfoID: clinicalinfoID,
    //admDate: admDate,
    //bed:bed,
    //bodytemp:bodyTemp,
    //bpm:bpm,
    //sato2:sato2,
    //timestamp:timestamp,
    //bloodpress:bloodpress})
//let response = await clinicalinfo.save();
    //console.log(response);
    //return{success: true, response};
    //}catch(err) {
        //console.log(err);
        //return{success: false, response: err}
    //}
    

let ClinicalInfoSchema = require('../model/clinicalinfo');
const { model } = require('mongoose');

module.exports.newClinicalInfo = async (clinicalinfo_id, adm_date, bed, body_temp, systolic, diastolic, bpm, sato2, timestamp) => {
    try {
        let blood_press = {systolic, diastolic};
        let clinicalinfo = new ClinicalInfoSchema({clinicalinfo_id, adm_date, bed, body_temp, blood_press, bpm, sato2, timestamp});
        let response = await clinicalinfo.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}