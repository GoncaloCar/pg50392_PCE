let CaretakerSchema = require("../model/caretaker");

module.exports.newCaretaker = async (caretakerid, name) =>{
    try{
        let caretaker = new CaretakerSchema({caretakerid:caretakerid,
            name:name})
        let response = await caretaker.save();
        console.log(response);
        return{success: true, response};
    }catch(err) {
        console.log(err);
        return{success: false, response: err}
    }
}
module.exports.findCaretakerByID = async (caretakerid) => {

}
