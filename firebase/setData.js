

import { getDatabase, ref, set } from "firebase/database";


module.exports = {

    saveData: function (req, callback) {
        
        const db = getDatabase();
        set(ref(db,"eM7jgbYvkHQizq2dD56KqPWdNO22"+"-status"), {
           status:req.status
        });
        callback(null, { "statuscode": 200, "message": "successfully inserted" })
    }

}

