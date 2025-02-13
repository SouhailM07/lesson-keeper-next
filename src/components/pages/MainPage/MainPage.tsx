import Navbar from "@/components/organisms/Navbar/Navbar";
import "./styles.css";
import SeasonsContainer from "@/components/organisms/SeasonsContainer/SeasonsContainer";
import SeasonsProvider from "@/context/SeasonsContext/SeasonsContext";
import { API_APP_URL } from "@/lib/constants";
import axios from "axios";

export default async function MainPage() {
  let seasonsData = await axios
    .get(`${API_APP_URL}/api/seasons`)
    .then((res) => res.data);
  return (
    <>
      <Navbar />
      <main>
        <SeasonsProvider>
          <SeasonsContainer seasonsData={seasonsData} />
        </SeasonsProvider>
      </main>
    </>
  );
}
