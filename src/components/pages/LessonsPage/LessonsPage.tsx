import LessonsContainer from "@/components/organisms/LessonsContainer/LessonsContainer";
import LessonsApiContextProvider from "@/context/LessonsApiContext/LessonsApiContext";

export default function LessonsPage({ moduleId, moduleTitle }) {
  return (
    <main>
      <LessonsApiContextProvider moduleId={moduleId} moduleTitle={moduleTitle}>
        <LessonsContainer />
      </LessonsApiContextProvider>
    </main>
  );
}
