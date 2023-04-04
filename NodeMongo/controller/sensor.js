const sensor = require("../model/sensor");
let SensorSchema = require("../model/sensor");

module.exports.newSensor = async (sensorid, sensornum, type) =>{
    try{
        let sensor = new SensorSchema({sensorid: sensorid, 
            sensornum:sensornum, 
            type_of_sensor: type})
        let response = await sensor.save();
        console.log(response);
        return{success: true, response};
    }catch(err) {
        console.log(err);
        return{success: false, response: err}
    }
}


module.exports.updateSensor = async(sensorid, sensornum, type) =>{
    try{
        if (sensornum && type){
            var response = await SensorSchema.updateOne({sensorid},{
                $set:{
                    sensornum,
                    type
                }
            });
        }else if(sensornum){
            var response = await SensorSchema.updateOne({sensorid},{
                $set:{sensornum}
            });
        }else{
            var response = await SensorSchema.updateOne({type},{
               $set:{type}
            })
        }
        return{success: true, response};
    }catch(err) {
        console.log(err);
        return{succes: false, response}
    }
}

module.exports.removeSensor = async(sensorid) =>{
    try{
        const response = await SensorSchema.deleteOne({sensorid})
        return{success: true, response}
    }
    catch(err){
        console.log(err);
        return{success: false, response}
    }
}