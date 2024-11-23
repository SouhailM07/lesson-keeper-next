import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";

export default function ModulesPage({ seasonId }: { seasonId: string }) {
  return (
    <section className="section-container">
      <AddNewItem addNew={AddNew_e.Module} />
    </section>
  );
}
