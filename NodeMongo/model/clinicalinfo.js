var mongoose=require('mongoose');
var Schema = mongoose.Schema;
const { v4: uuidv4} = require("uuid");


var BloodpressSchema =  new Schema({
    systolic: {type:Number}, 
    diastolic: {type: Number}
})

var ClinicalInfoSchema =  new Schema({
    admDate: {type:Number}, 
    bed: {type: String},
    bodyTemp: {type: Number},
    bpm: {type:Number},
    bloodpress: {type:BloodpressSchema},
    sato2: {type:Number},
    timestamp: {type:Date},
    clinicalinfoID: {type:String, unique: true, required: true, default:uuidv4}
})


module.exports = mongoose.model('clinicalinfo', ClinicalInfoSchema)