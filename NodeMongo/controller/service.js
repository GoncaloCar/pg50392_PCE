const service = require("../model/service");
let ServiceSchema = require("../model/service");

module.exports.newService = async (servicecod, servicedesc) =>{
    try{
        let sensor = new ServiceSchema({servicecod: servicecod, 
            servicedesc:servicedesc})
        let response = await service.save();
        console.log(response);
        return{success: true, response};
    }catch(err) {
        console.log(err);
        return{success: false, response: err}
    }
}