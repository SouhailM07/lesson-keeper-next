import "./styles.css";
import Navbar from "@/components/organisms/Navbar/Navbar";
import SeasonsContainer from "@/components/organisms/SeasonsContainer/SeasonsContainer";

export default function MainPage() {
  return (
    <div id="main-container">
      <Navbar />
      <main>
        <SeasonsContainer />
      </main>
    </div>
  );
}
