import { Model, model, Schema, Document } from "mongoose";

interface ISeason extends Document {
  name: string;
  duration?: any;
  modules?: any;
}

const seasonSchema = new Schema<ISeason>({
  name: { type: String, required: true },
  duration: { type: Schema.Types.Mixed, default: null },
});

let Season: Model<ISeason>;

try {
  Season = model<ISeason>("Season");
} catch (error) {
  Season = model<ISeason>("Season", seasonSchema);
}

export default Season;