import * as dotenv from 'dotenv';
dotenv.config();
import BaseConfig from '../config';
import * as express from "express";
import ConnectDB from '../config/database';
import UserRouter from '../routes/user';

const PORT = ( mode: string ) => {
   const mapModeToPort: any = {
        "LOCAL": 3331 ,
        "STG": 3332,
        "PROD": 3333    
   }
   console.log('MODE => ', mode);
   const port = mapModeToPort[mode]
   console.log( 'EXPRESS-PORT => ', port )
   return port;
};
ConnectDB()
const app = express.default();
app.get("/", (req: express.Request, res: express.Response ) => {
    res.json({result: true});
})

app.use('/users', UserRouter);


app.listen( PORT(BaseConfig.MODE), () => console.log("start") )