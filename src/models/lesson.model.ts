import { Model, model, Schema, Document } from "mongoose";

interface ILesson extends Document {
  name: string;
  moduleBy: any;
  file: {
    fileId: string;
    fileName: string;
    fileMimiType: string;
    fileUrl: string;
  };
}

const lessonSchema = new Schema<ILesson>({
  name: { type: String, required: true },
  moduleBy: { type: Schema.Types.ObjectId, ref: "Module" },
  file: {
    type: {
      fileId: String,
      fileName: String,
      fileMimiType: String,
      fileUrl: String,
    },
    required: true,
  },
});

let Lesson = Model<ILesson>;

try {
  Lesson = model<ILesson>("Lesson");
} catch (error) {
  Lesson = model<ILesson>("Lesson", lessonSchema);
}

export default Lesson;
