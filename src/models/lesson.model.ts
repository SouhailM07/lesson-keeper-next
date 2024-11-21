import { Model, model, Schema, Document } from "mongoose";

interface ILesson extends Document {
  name: string;
  file: {
    fileRef: string;
    fileName: string;
    fileUrl: string;
  };
}

const lessonSchema = new Schema<ILesson>({
  name: { type: String, required: true },
  file: {
    type: { fileRef: String, fileName: String, fileUrl: String },
    default: null,
  },
});

let Lesson = Model<ILesson>;

try {
  Lesson = model<ILesson>("lesson");
} catch (error) {
  Lesson = model<ILesson>("lesson", lessonSchema);
}

export default Lesson;
