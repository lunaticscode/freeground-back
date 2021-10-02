import { Document, Model, model, Schema  } from 'mongoose'
export interface UserProps extends Document{
    username: string,
    password: string,
    email: string,
    profile: string,   
}
const userSchema:Schema = new Schema({
    username: {
        type: "string",
        required: true,
        unique: true,
    },
    password: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
        unique: true,
    },
    profile: {
        type: "string",
        required: true,
    }
})
const User:Model<UserProps> = model("User", userSchema);
export default User;