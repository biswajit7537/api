import express from "express";
const app = express();
import {APP_PORT,DB_URL} from "./config";
import errorHandler from "./middlewares/errorHandler";
import mongoose from "mongoose";
import routes from "./routes";


// database connection
mongoose.connect(DB_URL,{useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('Database connected..');
});



app.use(express.json());

app.use("/api",routes);


app.use(errorHandler);
app.listen(APP_PORT,()=>{
    console.log(`Server is listening on port ${APP_PORT}.`);
})