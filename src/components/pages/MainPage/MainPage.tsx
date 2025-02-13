import "./styles.css";
import Navbar from "@/components/organisms/Navbar/Navbar";
import SeasonsContainer from "@/components/organisms/SeasonsContainer/SeasonsContainer";
import SeasonsProvider from "@/context/SeasonsContext/SeasonsContext";
import apiGet from "@/lib/apiGet";

export default async function MainPage() {
  let seasonsData = await apiGet("seasons");
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
