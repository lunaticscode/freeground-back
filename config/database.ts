
import { connect } from 'mongoose';
import BaseConfig from '../config';
const connectDB = async() => {
  const uri = BaseConfig.MONGO_URI;
  await connect( uri )
  .then( res => { console.log('\n[mongodb] success to connect\n'); return true; } )
  .catch( err => { console.log(err); return false; } )
}
export default connectDB;