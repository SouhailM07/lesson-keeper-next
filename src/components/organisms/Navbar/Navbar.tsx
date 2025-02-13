import CounterUp from "@/components/atoms/CounterUp/CounterUp";
import apiGet from "@/lib/apiGet";

export default async function Navbar() {
  let itemsCounts = await apiGet("counter");

  interface ISchoolData {
    label: string;
    value: number;
  }
  const schoolData: ISchoolData[] = [
    { label: "Seasons", value: itemsCounts.seasons || 0 },
    { label: "Modules", value: itemsCounts.modules || 0 },
    { label: "Lessons", value: itemsCounts.lessons || 0 },
  ];
  return (
    <header className="sticky top-0 bgBlur text-white h-[3.6rem] px-[1rem] ">
      <nav className="h-full flexBetween">
        <h1 className="text-[1.4rem]">Lessons Keeper</h1>
        <ul className="flex gap-[1rem]">
          {schoolData.map((e, i) => (
            <li key={i}>
              <span>{e.label} : </span>
              <span style={{ textShadow: "0px 0px 3px  white" }} className="">
                <CounterUp end={e.value} />
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
