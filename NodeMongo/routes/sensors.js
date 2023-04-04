var express = require("express");
var router = express.Router();
var axios = require('axios');
let sensorController = require("../controller/sensor");
let SensorSchema = require("../model/sensor")
const { route } = require(".");
const mongoose = require('mongoose')

router.get("/", (req, res) => {
    res.json({
        rota: "sensores"
    })
})

router.get("/identificador/:id", (req, res) => {
    res.json({
        identificador: req.params.id,
    })
})

router.get("/acedehpeixoto/:id", (req, res) => {
    axios.get(
        'http://nosql.hpeixoto.me/api/sensor/' + req.params.id
    )
    .then(response => {
        res.json(response.data);
    })
    .catch(err => {
        console.log(err)
        res.json(err);
    })
})


router.get("/id", (req, res) => {
    mongoose.connect('mongodb://localhost:9000/leituras');

    SensorSchema.find({sensorid: req.params.id}, (err, sensors) => {
        if (err) {
            res.json(err);
        } else {
            res.json(sensors);
        }
    });

    mongoose.connection.close();
})
router.get("/list", (req, res) => {
    mongoose.connect('mongodb://localhost:9000/leituras');

    SensorSchema.find((err, sensors) => {
        if (err) {
            res.json(err);
        } else {
            res.json(sensors);
        }
    });

    mongoose.connection.close();
})


router.put("/update", async(req, res) => {
	const {sensorid, sensornum, type_of_sensor} = req.body;
    let updateSensorResponse = await sensorController.updateSensor(sensorid, sensornum, type_of_sensor)
    if (updateSensorResponse.success) {
        res.status(200).json({info: "Sensor atualizado com sucesso"})
    }
    else{
        res.status(200).json({info: "Sensor não foi atualizado",
        sensorid:sensorid,
        sensornum:sensornum,
        type_of_sensor : type_of_sensor
        })
    }
});

router.delete("/remove", async(req, res) =>{
    const {sensorid} = req.body;
    let deleteSensorResponse = await sensorController.removeSensor(sensorid)
    if (deleteSensorResponse.success){
        res.status(200).json({info: "Sensor eliminado com sucesso"})
    }
    else{
        res.status(200).json({info: "Erro na remoção"})
    }
})






module.exports = router;
