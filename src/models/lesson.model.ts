import { ILesson } from "@/types/api.types";
import { Model, model, Schema, Document } from "mongoose";

export type Lesson_t = ILesson & Document;

const lessonSchema = new Schema<Lesson_t>({
  name: { type: String, required: true },
  moduleBy: { type: Schema.Types.ObjectId, ref: "Module" },
  file: {
    type: {
      fileId: String,
      fileName: String,
      fileMimiType: String,
      fileUrl: String,
      filePreview: String,
    },
  },
});

let Lesson = Model<Lesson_t>;

try {
  Lesson = model<Lesson_t>("Lesson");
} catch (error) {
  Lesson = model<Lesson_t>("Lesson", lessonSchema);
}

export default Lesson;
