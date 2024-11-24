import handle500 from "@/lib/handle500";
import Lesson from "@/models/lesson.model";
import Module from "@/models/modules.model";
import handleResponse from "@/lib/handleResponse";
import { deleteFile } from "@/lib/appwriteHandlers";
import queryParam from "@/lib/queryParam";

export async function module_controller_delete(req) {
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
      return handleResponse("module not found", 404); // Not Found
    }
    // Return success response
    return handleResponse("Module was deleted successfully", 200);
  } catch (error) {
    handle500(error);
  }
}
