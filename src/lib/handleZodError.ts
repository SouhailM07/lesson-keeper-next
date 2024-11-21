import handle500 from "./handle500";
import handleResponse from "./handleResponse";

// ! need to be checked and tested
// export default function handleZodError(error) {
//   if (error instanceof z.ZodError) {
//     // Zod validation error handling
//     return handleResponse(
//       { msg: error.errors.map((e) => e.message).join(", "), status: 400 },
//       400
//     );
//   }
//   return handle500(error);
// }
