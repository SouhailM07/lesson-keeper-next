"use client";
import "./styles.css";
import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import SeasonRenderItem from "@/components/atoms/SeasonRenderItem/SeasonRenderItem";
import MyBreadcrumb, {
  IMyBreadcrumb,
} from "@/components/atoms/MyBreadcrumb/MyBreadcrumb";

export default function SeasonsContainer({ seasonsData }) {
  const breadcrumbs: IMyBreadcrumb = {
    mainPage: "Seasons",
    links: [{ link: "/", label: "Seasons" }],
  };
  return (
    <section className="section-container">
      {/* <PageTitle title="Seasons" /> */}
      <MyBreadcrumb {...breadcrumbs} />
      <ul role="list" className="flex gap-[1rem] flex-wrap ">
        {seasonsData.map((e, i) => (
          <li role="listitem" key={i}>
            <SeasonRenderItem
              id={e._id}
              itemId={e._id}
              title={e.name}
              modulesLen={10}
              duration={e.duration}
            />
          </li>
        ))}
        <AddNewItem addNew={AddNew_e.Section} />
      </ul>
    </section>
  );
}
