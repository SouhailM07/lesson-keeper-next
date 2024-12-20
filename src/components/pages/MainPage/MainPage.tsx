import Navbar from "@/components/organisms/Navbar/Navbar";
import "./styles.css";
import SeasonsContainer from "@/components/organisms/SeasonsContainer/SeasonsContainer";
import SeasonsProvider from "@/context/SeasonsContext/SeasonsContext";

export default function MainPage() {
  return (
    <>
      <Navbar />
      <main>
        <SeasonsProvider>
          <SeasonsContainer />
        </SeasonsProvider>
      </main>
    </>
  );
}
