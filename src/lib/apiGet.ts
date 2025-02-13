import axios from "axios";
import { API_APP_URL } from "./constants";

export default async function apiGet(url: string) {
  return await axios
    .get(`${API_APP_URL}/api/${url}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
