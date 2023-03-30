var mongoose = require("mongoose")
var Schema = mongoose.Schema

var ServiceSchema = new Schema({
    servicecod: {type:String},
    servicedesc: {type:String}
})

module.exports = mongoose.model('service', ServiceSchema)