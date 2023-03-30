var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema =  new Schema({
    patientid: {type:Number, unique:true}, 
    patientname: {type:String},
    patientbirthdate: {type:Date},
    patientage: {type: Number}
})


module.exports = mongoose.model('patient', PatientSchema)