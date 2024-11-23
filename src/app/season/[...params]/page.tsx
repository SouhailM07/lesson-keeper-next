// app/season/[seasonId]/page.tsx

import ModulesPage from "@/components/pages/ModulesPage/ModulesPage";

export default async function Page({ params }) {
  const { params: routerParams } = await params; // Destructure seasonId from params
  const [seasonTitle, seasonId] = routerParams || [];

  return <ModulesPage seasonId={seasonId} seasonTitle={seasonTitle} />;
}
