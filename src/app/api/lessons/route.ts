import { NextRequest } from "next/server";
import connectMongoose from "@/lib/connectMongoose";
import handleResponse from "@/lib/handleResponse";
import queryParam from "@/lib/queryParam";
import Lesson from "@/models/lesson.model";
import handle500 from "@/lib/handle500";
import { ApiMessages } from "@/types";

connectMongoose();

// ! local api responses [start]
const messages: ApiMessages = {
  create_item: ["Project was created successfully", 201],
  update_item: ["Project was updated successfully", 200],
  delete_item: ["Project was deleted successfully", 200],
  not_found: ["Project was not found", 404],
};
// ! local api handlers [end]

export async function GET(req: NextRequest) {
  try {
    const moduleId = queryParam(req, "moduleId");
    if (moduleId) {
      const selectedLessons = await Lesson.find({ moduleBy: moduleId });
      if (!selectedLessons) {
        return handleResponse(...messages.not_found);
      }
      return handleResponse(selectedLessons, 200);
    }
    const lessons = await Lesson.find({});
    return handleResponse(lessons, 200);
  } catch (error) {
    return handleResponse(error, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const values = await req.json();
    // ! add upload file here

    const newLesson = new Lesson(values);
    await newLesson.save();
    return handleResponse(...messages.create_item);
  } catch (error) {
    return handle500(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    const values = await req.json();
    const editedLesson = await Lesson.findByIdAndUpdate(id, values);
    if (!editedLesson) {
      return handleResponse(...messages.not_found);
    }
    return handleResponse(...messages.update_item);
  } catch (error) {
    return handle500(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    const deletedLesson = await Lesson.findByIdAndDelete(id);
    if (!deletedLesson) {
      return handleResponse(...messages.not_found);
    }
    return handleResponse(...messages.delete_item);
  } catch (error) {
    return handle500(error);
  }
}
