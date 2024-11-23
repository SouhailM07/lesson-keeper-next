import "./styles.css";
import Navbar from "@/components/organisms/Navbar/Navbar";
import SeasonsContainer from "@/components/organisms/SeasonsContainer/SeasonsContainer";
import SeasonsProvider from "@/context/SeasonsContext/SeasonsContext";

export default function MainPage() {
  return (
    <main>
      <SeasonsProvider>
        <SeasonsContainer />
      </SeasonsProvider>
    </main>
  );
}
