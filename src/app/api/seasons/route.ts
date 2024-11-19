import { NextRequest } from "next/server";
import connectMongoose from "@/lib/connectMongoose";
import handleResponse from "@/lib/handleResponse";
import queryParam from "@/lib/queryParam";
import Season from "@/models/season.model";

connectMongoose();
// ! api local handler [start]
const handle404 = () => handleResponse("Season was not found", 404);
const handle500 = (error) => handleResponse(error, 500);
// ! api local handler [end]

export async function GET(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    if (id) {
      const selectedSeason = await Season.findById(id).populate("userBy");
      if (!selectedSeason) {
        return handle404();
      }
      return handleResponse(selectedSeason, 200);
    }
    const userId = queryParam(req, "userId");
    if (userId) {
      const userSeasons = await Season.find({ userBy: userId });
      if (!userSeasons.length) {
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
    const values = req.json();
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
    const id = queryParam(req, "id");
    const deletedSeason = await Season.findByIdAndDelete(id);
    if (!deletedSeason) {
      return handle404();
    }
    return handleResponse("season was deleted successfully", 200);
  } catch (error) {
    return handleResponse(error, 500);
  }
}
