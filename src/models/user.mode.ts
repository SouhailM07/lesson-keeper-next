import { Model, Document, model, Schema } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  sidebar_preferred_direction: boolean;
  personal_themes?: any;
}

const userSchema = new Schema<IUser>({
  clerkId: String,
  sidebar_preferred_direction: { type: Boolean, default: false },
  personal_themes: { type: Schema.Types.Mixed, default: [] },
});

let User: Model<IUser>;

try {
  User = model<IUser>("User");
} catch (error) {
  User = model<IUser>("User", userSchema);
}

export default User;
