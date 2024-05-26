import app from './app.js';
import {connectdb} from './data/database.js'
connectdb();

app.listen(5000,()=>{
    console.log("app listening at 5000");
})