import "./styles.css";
import Navbar from "@/components/organisms/Navbar/Navbar";
import SeasonsContainer from "@/components/organisms/SeasonsContainer/SeasonsContainer";
import SeasonsProvider from "@/context/SeasonsContext/SeasonsContext";
import SeasonsFormProvider from "@/context/SeasonsFormContext/SeasonsFormContext";

export default function MainPage() {
  return (
    <div id="main-container">
      <Navbar />
      <main>
        <SeasonsProvider>
          <SeasonsFormProvider>
            <SeasonsContainer />
          </SeasonsFormProvider>
        </SeasonsProvider>
      </main>
    </div>
  );
}
