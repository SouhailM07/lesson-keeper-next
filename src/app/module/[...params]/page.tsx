import LessonsPage from "@/components/pages/LessonsPage/LessonsPage";

export default async function Page({ params }) {
  const { params: routerParams } = await params;
  const [moduleTitle, moduleId] = routerParams;
  return <LessonsPage moduleId={moduleId} moduleTitle={moduleTitle} />;
}
