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
        var response_sensor;
        //const sensorid1 = response.data.sensorid;
        let newSensorResponse = await sensorController.newSensor(sensorid, sensornum, type_of_sensor);
        if(newSensorResponse.success) {
            response_sensor ="Novo sensor adicionado"
        } else{
            response_sensor = "Erro ao adicionar novo sensor"
        }
        const{caretakerid, name} = response.data;
        var response_caretaker;
        let newCaretakerResponse = await caretakerController.newCaretaker(caretakerid, name);
        if(newCaretakerResponse.success){
          response_caretaker =  "Novo caretaker adicionado"
        } else{
          response_caretaker = "Erro ao adicionar novo caretak"
        }
        const{patientid, patientname, patientbirthdate, patientage} = response.data;
        var response_patient;
        let newPatientResponse = await patientController.newPatient(patientid, patientname, patientbirthdate, patientage);
        if(newPatientResponse.sucess){
          response_patient = "Novo paciente adicionado"
        }
        else{
          response_patient = "Erro ao adicionar novo paciente"
        }
        const{servicecod, servicedesc} = response.data;
        var response_service;
        let newServiceResponse = await serviceController.newService(servicecod, servicedesc);
        if(newServiceResponse.success){
          response_service = "Novo serviço adicionado"
        }else{
          response_service = "Erro ao adicionar novo serviço"
        }
       const{clinicalinfoID, admDate, bed, bodyTemp, bpm, sato2, bloodpress, timestamp} = response.data();
       var response_clinicalinfo;
       let newClinicalinfoResponse = await clinicalinfoController.newClinicalInfo(clinicalinfoID, admDate, bed, bodyTemp, bpm, sato2, bloodpress.systolic, bloodpress.diastolic, timestamp);
       if(newClinicalinfoResponse.success){
        response_clinicalinfo = "Nova informação adicionada"
       }else{
        response_clinicalinfo =  "Erro ao adicionar informação"
       }
       res.json({
        "Sensor" : response_sensor,
        "Paciente" : response_patient,
        "Caretaker" : response_caretaker,
        "Servico" : response_service,
        "Informacao" : response_clinicalinfo
      })
    })
    .catch(err => {
      console.log(err)
      res.json(err);
    })
})



module.exports = router;