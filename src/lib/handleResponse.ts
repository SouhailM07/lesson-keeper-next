import { NextResponse } from "next/server";

// export default function handleResponse(msg, status: number) {
// return NextResponse.json(msg, { status });
// }

export default function handleResponse(...restParam) {
  if (arguments.length > 2) {
    throw new Error("This function only accepts up to two arguments.");
  }
  return NextResponse.json(restParam[0], { status: restParam[1] });
}
