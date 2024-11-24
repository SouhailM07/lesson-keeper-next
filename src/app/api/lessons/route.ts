import { NextRequest } from "next/server";
import connectMongoose from "@/lib/connectMongoose";
import handleResponse from "@/lib/handleResponse";
import queryParam from "@/lib/queryParam";
import Lesson from "@/models/lesson.model";
import { getKeys } from "@/lib/aliases";
import handle500 from "@/lib/handle500";
import { ResponseMessages } from "@/types";

connectMongoose();

// ! local api handlers [start]
const messages: ResponseMessages = {
  not_found: { msg: "lesson(s) was not found", status: 404 },
  create_item: { msg: "lesson was created successfully", status: 201 },
  update_item: { msg: "lesson was updated successfully", status: 200 },
  delete_item: { msg: "lesson was deleted successfully", status: 200 },
};
// ! local api handlers [end]

export async function GET(req: NextRequest) {
  try {
    const moduleId = queryParam(req, "moduleId");
    if (moduleId) {
      const selectedLessons = await Lesson.find({ moduleBy: moduleId });
      if (!selectedLessons) {
        return handleResponse(...getKeys(messages.not_found));
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
    const newLesson = new Lesson(values);
    await newLesson.save();
    return handleResponse(...getKeys(messages.create_item));
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
      return handleResponse(...getKeys(messages.not_found));
    }
    return handleResponse(...getKeys(messages.update_item));
  } catch (error) {
    return handle500(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    const deletedLesson = await Lesson.findByIdAndDelete(id);
    if (!deletedLesson) {
      return handleResponse(...getKeys(messages.not_found));
    }
    return handleResponse(...getKeys(messages.delete_item));
  } catch (error) {
    return handle500(error);
  }
}
