import connectMongoose from "@/lib/connectMongoose";
import handleResponse from "@/lib/handleResponse";
import handle500 from "@/lib/handle500";
import queryParam from "@/lib/queryParam";
import Lesson from "@/models/lesson.model";

connectMongoose();

export async function GET() {
  let allLessonsCount = await Lesson.find({}).select("_id");
  return handleResponse({ lessons: allLessonsCount.length }, 200);
}
