import * as dotenv from 'dotenv';
dotenv.config();
const CONFIG = {
    MODE: process.env.MODE as string,
    MONGO_URI: process.env.MONOGO_URI as string,
}
export default CONFIG;