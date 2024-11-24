import { NextRequest } from "next/server";
import connectMongoose from "@/lib/connectMongoose";
import handleResponse from "@/lib/handleResponse";
import queryParam from "@/lib/queryParam";
import Season from "@/models/season.model";
import Module from "@/models/modules.model";
import Lesson from "@/models/lesson.model";
import { deleteFile } from "@/lib/appwriteHandlers";

connectMongoose();
// ! api local handler [start]
const handle404 = () => handleResponse("Season was not found", 404);
const handle500 = (error) => handleResponse(error, 500);
// ! api local handler [end]

export async function GET(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    if (id) {
      const selectedSeason = await Season.findById(id);
      if (!selectedSeason) {
        return handle404();
      }
      return handleResponse(selectedSeason, 200);
    }
    const userId = queryParam(req, "userId");
    if (userId) {
      const userSeasons = await Season.find({ userId });
      if (!userSeasons) {
        return handleResponse("User id does not exist", 404);
      }
      return handleResponse(userSeasons, 200);
    }
    const seasons = await Season.find({});
    return handleResponse(seasons, 200);
  } catch (error) {
    return handle500(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const values = await req.json();
    const newSeason = new Season(values);
    await newSeason.save();
    return handleResponse("new season was created successfully", 201);
  } catch (error) {
    return handle500(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    const values = await req.json();
    const updatedSeason = await Season.findByIdAndUpdate(id, values);
    if (!updatedSeason) {
      return handle404();
    }
    return handleResponse("season was updated successfully", 200);
  } catch (error) {
    return handle500(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Extract the ID from query parameters
    const id = queryParam(req, "id");
    if (!id) {
      return handleResponse("Season ID is required", 400); // Return early for missing ID
    }

    // Find all modules associated with the season
    const deletedModules = await Module.find({ seasonBy: id });

    // Process modules in parallel
    await Promise.all(
      deletedModules.map(async (module) => {
        try {
          // Find all lessons associated with the module
          const deletedLessons = await Lesson.find({ moduleBy: module._id });

          // Process lessons in parallel
          await Promise.all(
            deletedLessons.map(async (lesson) => {
              try {
                // Delete associated files
                if (lesson.file?.fileId) {
                  await deleteFile(lesson.file.fileId);
                }
              } catch (err) {
                console.error(
                  `Failed to delete file with ID: ${lesson.file?.fileId}`,
                  err
                );
              }
            })
          );

          // Optionally delete the lesson itself after handling its file
          await Lesson.deleteMany({ moduleBy: module._id });
        } catch (err) {
          console.error(`Failed to process module with ID: ${module._id}`, err);
        }
      })
    );

    // Finally, delete the season
    const deletedSeason = await Season.findByIdAndDelete(id);
    if (!deletedSeason) {
      return handle404(); // Return 404 if no season was found
    }

    return handleResponse("Season was deleted successfully", 200);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return handleResponse("Internal Server Error", 500);
  }
}
