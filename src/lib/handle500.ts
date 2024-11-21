import handleResponse from "./handleResponse";

export default function handle500(error) {
  return handleResponse(`The is an Error : ${error}`, 500);
}
