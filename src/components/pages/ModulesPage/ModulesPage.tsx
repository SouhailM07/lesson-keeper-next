import ModulesContainer from "@/components/organisms/ModulesContainer/ModulesContainer";
import ModulesApiContextProvider from "@/context/ModulesApiContext/ModulesApiContext";
import apiGet from "@/lib/apiGet";

export default async function ModulesPage({
  seasonTitle,
  seasonId,
}: {
  seasonTitle: string;
  seasonId: string;
}) {
  const modulesData = await apiGet(`modules?seasonId=${seasonId}`);
  return (
    <ModulesApiContextProvider seasonId={seasonId} seasonTitle={seasonTitle}>
      <ModulesContainer moduleData={modulesData} />
    </ModulesApiContextProvider>
  );
}
