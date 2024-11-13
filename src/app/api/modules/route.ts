import { NextRequest } from "next/server";
import connectMongoose from "@/lib/connectMongoose";
import handleResponse from "@/lib/handleResponse";
import queryParam from "@/lib/queryParam";
import Module from "@/models/modules.model";

connectMongoose();
// ! local api handlers [start]
const handle404 = () => handleResponse("module was not found", 404);
const handle505 = (error) => handleResponse(error, 500);
// ! local api handlers [end]

export async function GET(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    if (id) {
      const selectedModule = await Module.findById(id).populate("seasonBy");
      if (!selectedModule) {
        return handle404();
      }
      return handleResponse(selectedModule, 200);
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
    const deletedModule = await Module.findByIdAndDelete(id);
    if (!deletedModule) {
      return handle404();
    }
    return handleResponse("module was deleted successfully", 200);
  } catch (error) {
    return handle505(error);
  }
}
