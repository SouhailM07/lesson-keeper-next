import { Document, model, Model, Schema } from "mongoose";

interface IModule extends Document {
  name: string;
  mentor_name?: string;
  lessons?: any;
  seasonBy?: any;
}

const moduleSchema = new Schema<IModule>(
  {
    name: String,
    mentor_name: { type: String, default: null },
    seasonBy: { type: Schema.Types.ObjectId, ref: "Season" },
  },
  { timestamps: true }
);

let Module: Model<IModule>;

try {
  Module = model<IModule>("Module");
} catch (error) {
  Module = model<IModule>("Module", moduleSchema);
}

export default Module;
