// app/season/[seasonId]/page.tsx

import ModulesPage from "@/components/pages/ModulesPage/ModulesPage";

export default async function Page({ params }) {
  const { seasonId } = await params; // Destructure seasonId from params

  return <ModulesPage seasonId={seasonId} />;
}
