import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import ModulesApiContextProvider, {
  useModulesApiContext,
} from "@/context/ModulesApiContext/ModulesApiContext";
import modulesStore from "@/zustand/modules.store";
import { useEffect } from "react";

export default function ModulesContainer() {
  const { fetch_get_modules }: any = useModulesApiContext();
  const { modules } = modulesStore((state) => state);
  useEffect(() => {
    fetch_get_modules();
  }, []);
  return (
    <section className="section-container">
      <article className="flexBetween">
        <PageTitle title="Modules" />
        <button>back</button>
      </article>
      <ul>
        {modules.map((e, i) => (
          <li key={i}>{e.name}</li>
        ))}
        <AddNewItem addNew={AddNew_e.Module} />
      </ul>
    </section>
  );
}
