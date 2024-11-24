import { NextRequest } from "next/server";
import connectMongoose from "@/lib/connectMongoose";
import handleResponse from "@/lib/handleResponse";
import queryParam from "@/lib/queryParam";
import Module from "@/models/modules.model";
import Lesson from "@/models/lesson.model";
import { deleteFile } from "@/lib/appwriteHandlers";

connectMongoose();
// ! local api handlers [start]
const handle404 = () => handleResponse("module was not found", 404);
const handle505 = (error) => handleResponse(error, 500);
// ! local api handlers [end]

export async function GET(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    const seasonId = queryParam(req, "seasonId");
    if (id) {
      const selectedModule = await Module.findById(id).populate("seasonBy");
      if (!selectedModule) {
        return handle404();
      }
      return handleResponse(selectedModule, 200);
    } else if (seasonId) {
      const seasonModules = await Module.find({ seasonBy: seasonId });
      if (!seasonModules) {
        return handleResponse("Season Id does not Exist", 404);
      }
      return handleResponse(seasonModules, 200);
    }
    const modules = await Module.find({});
    return handleResponse(modules, 200);
  } catch (error) {
    return handle505(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const values = await req.json();
    const newModule = new Module(values);
    await newModule.save();
    return handleResponse("new module was added successfully", 201);
  } catch (error) {
    return handle505(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    const values = await req.json();
    const updatedModule = await Module.findByIdAndUpdate(id, values);
    if (!updatedModule) {
      return handle404();
    }
    return handleResponse("module was updated successfully", 200);
  } catch (error) {
    return handle505(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    // Find all lessons associated with the module
    const deleteLessons = await Lesson.find({ moduleBy: id });
    // Delete associated files
    await Promise.all(
      deleteLessons.map(async (lesson) => {
        try {
          await deleteFile(lesson.file.fileId);
        } catch (err) {
          console.error(`Failed to delete file with ID: ${lesson.fileId}`, err);
        }
      })
    );

    // Delete all lessons associated with the module
    await Lesson.deleteMany({ moduleBy: id });
    // Delete the module itself
    const deletedModule = await Module.findByIdAndDelete(id);
    if (!deletedModule) {
      return handle404(); // Not Found
    }
    // Return success response
    return handleResponse("Module was deleted successfully", 200);
  } catch (error) {
    return handle505(error); // Internal Server Error
  }
}
