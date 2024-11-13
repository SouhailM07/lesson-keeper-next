import { NextRequest } from "next/server";
import connectMongoose from "@/lib/connectMongoose";
import User from "@/models/user.mode";
import queryParam from "@/lib/queryParam";
import handleResponse from "@/lib/handleResponse";

connectMongoose();
// ! api local handlers [start]
const handle505 = (error) => handleResponse(error, 500);
const handle404 = () => handleResponse("user was not found", 404);
// ! api local handlers [end]

export async function GET(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    if (id) {
      const selectedUser = await User.findById(id);
      if (!selectedUser) {
        return handle404();
      }
      return handleResponse(selectedUser, 200);
    }
    const users = await User.find({});
    return handleResponse(users, 200);
  } catch (error) {
    return handle505(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const values = await req.json();
    const newUser = new User(values);
    await newUser.save();
    return handleResponse("New User was created successfully", 201);
  } catch (error) {
    return handle505(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    const values = await req.json();
    const updatedUser = await User.findByIdAndUpdate(id, values);
    if (!updatedUser) {
      return handle404();
    }
    return handleResponse("user data was updated successfully", 200);
  } catch (error) {
    handle505(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = queryParam(req, "id");
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return handle404();
    }
    return handleResponse("user was deleted successfully", 200);
  } catch (error) {
    handle505(error);
  }
}
