import connectMongoose from "@/lib/connectMongoose";
import handleResponse from "@/lib/handleResponse";
import handle500 from "@/lib/handle500";
import queryParam from "@/lib/queryParam";
import Lesson from "@/models/lesson.model";
import Module from "@/models/modules.model";
import Season from "@/models/season.model";

connectMongoose();

export async function GET() {
  let allLessonsCount = await Lesson.find({}).select("_id");
  let allModulesCount = await Module.find({}).select("_id");
  let allSeasonsCount = await Season.find({}).select("_id");
  return handleResponse(
    {
      lessons: allLessonsCount.length,
      modules: allModulesCount.length,
      seasons: allSeasonsCount.length,
    },
    200
  );
}
