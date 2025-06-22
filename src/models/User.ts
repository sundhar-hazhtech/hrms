import mongoose, { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    phone: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);

export default User;
