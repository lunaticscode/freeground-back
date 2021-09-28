import * as dotenv from 'dotenv';
dotenv.config();
const CONFIG = {
    MODE: process.env.MODE as string,
}

export default CONFIG;