// app/season/[seasonId]/page.tsx
import { API_APP_URL } from "@/lib/API_APP_URL";
import axios from "axios";

export default async function Page({ params }) {
  const { seasonId } = await params; // Destructure seasonId from params
  const seasonData = await getSeason(seasonId); // Fetch or process data using seasonId

  return (
    <div>
      <h1>Season: {seasonId}</h1>
      {/* <p>{JSON.stringify(seasonData)}</p> */}
    </div>
  );
}

// Example fetch function
async function getSeason(seasonId: string) {
  // Simulate an async API call
  try {
    const res = await axios.get(`${API_APP_URL}/api/seasons?id=${seasonId}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
