import { NextResponse } from "next/server";

export default function handleResponse(msg, status: number = 200) {
  return NextResponse.json(msg, { status });
}
