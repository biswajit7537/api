const ofirebase = require("../../firebase/setData")

const locationController = {
    location(req,res,next){
        ofirebase.saveData(req.body, function(err,data){
             res.send(data);
        })
    }
}

export default locationController;