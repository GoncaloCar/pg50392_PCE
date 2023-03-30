var express = require("express");
var router = express.Router();
var axios = require('axios');
let sensorController = require("../controller/sensor");
let caretakerController = require("../controller/caretaker");
let patientController = require("../controller/patient");
let serviceController = require("../controller/service");
let clinicalinfoController = require("../controller/clinicalinfo");

router.get("/", (req, res) => {
  res.json({
    rota: "index"
  })
})

router.get("/acedehpeixoto/:id", (req, res) => {
    axios.get(
        'http://nosql.hpeixoto.me/api/sensor/' + req.params.id
    )
    .then(async response => {
        const {sensorid, sensornum, type_of_sensor} = response.data;
        //const sensorid1 = response.data.sensorid;
        let newSensorResponse = await sensorController.newSensor(sensorid, sensornum, type_of_sensor);
        if(newSensorResponse.success) {
            res.status(200).json({info: "Novo sensor adicionado"});
        } else{
            res.status(200).json({info: "Erro ao adicionar novo sensor"});
        }
        const{caretakerid, name} = response.data;
        let newCaretakerResponse = await caretakerController.newCaretaker(caretakerid, name);
        if(newCaretakerResponse.success){
          res.status(200).json({info: "Novo caretaker adicionado"});
        } else{
          res.status(200).json({info: "Erro ao adicionar novo caretak"});
        }
        const{patientid, patientname, patientbirthdate, patientage} = response.data;
        let newPatientResponse = await patientController.newPatient(patientid, patientname, patientbirthdate, patientage);
        if(newPatientResponse.sucess){
          res.status(200).json({info: "Novo paciente adicionado"});
        }
        else{
          res.status(200).json({info: "Erro ao adicionar novo paciente"});
        }
        const{servicecod, servicedesc} = response.data;
        let newServiceResponse = await serviceController.newService(servicecod, servicedesc);
        if(newServiceResponse.success){
          res.status(200).json({info: "Novo serviço adicionado"})
        }else{
          res.status(200).json({info: "Erro ao adicionar novo serviço"})
        }
       res.json(response.data);
       const{clinicalinfoID, admDate, bed, bodyTemp, bpm, sato2, bloodpress, timestamp} = response.data();
       let newClinicalinfoResponse = await clinicalinfoController.newClinicalInfo(clinicalinfoID, admDate, bed, bodyTemp, bpm, sato2, bloodpress.systolic, bloodpress.diastolic, timestamp);
       if(newClinicalinfoResponse.success){
        res.status(200).json({info: "Nova informação adicionada"})
       }else{
        res.status(200).json({info: "Erro ao adicionar informação"})
       }
    })
})
module.exports = router;