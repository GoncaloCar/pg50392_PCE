

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