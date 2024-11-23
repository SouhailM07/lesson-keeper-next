import ModulesContainer from "@/components/organisms/ModulesContainer/ModulesContainer";
import ModulesApiContextProvider from "@/context/ModulesApiContext/ModulesApiContext";

export default function ModulesPage({
  seasonTitle,
  seasonId,
}: {
  seasonTitle: string;
  seasonId: string;
}) {
  return (
    <ModulesApiContextProvider seasonId={seasonId}>
      <ModulesContainer />
    </ModulesApiContextProvider>
  );
}
