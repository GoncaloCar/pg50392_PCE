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

router.get("/list", (req, res) => {

    SensorSchema.find((err, sensors) => {
        if (err) {
            res.json(err);
        } else {
            res.json(sensors);
        }
    });

})

router.get("/list/:id", (req, res) => {

    SensorSchema.find({sensorid: req.params.id}, (err, sensors) => {
        if (err) {
            res.json(err);
        } else {
            res.json(sensors);
        }
    });
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

router.delete("/remove/:id", async(req, res) =>{
    const {sensorid} = req.body;
    let deleteSensorResponse = await sensorController.removeSensor(sensorid)
    if (deleteSensorResponse.success){
        res.status(200).json({info: "Sensor eliminado com sucesso"})
    }
    else{
        res.status(200).json({info: "Erro na remoção"})
    }
})
router.get("/:id", (req, res) => {
    SensorModel.find({sensor_id: req.params.id}, (err, sensors) => {
        if (err) {
            res.json(err);
        } else {
            res.json(sensors);
        }
    });
})


router.post("/new", async (req, res) => {
    const {sensorid, sensornum, type_of_sensor} = req.body;
    let newSensorResponse = await sensorController.newSensor(sensorid, sensornum, type_of_sensor);
    if (newSensorResponse.success) {
        res.status(200).json({success: true, info: "Sensor adicionado com sucesso!"});
    } else {
        res.status(200).json({success: false, info: "Erro ao adicionar sensor!"});
    };
})



module.exports = router;
