import CounterUp from "@/components/atoms/CounterUp/CounterUp";
import { API_APP_URL } from "@/lib/constants";
import axios from "axios";

export default async function Navbar() {
  let itemsCounts = await axios
    .get(`${API_APP_URL}/api/counter`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return { lessons: 0, modules: 0, seasons: 0 };
    });

  interface ISchoolData {
    label: string;
    value: number;
  }
  const schoolData: ISchoolData[] = [
    { label: "Seasons", value: itemsCounts.seasons },
    { label: "Modules", value: itemsCounts.modules },
    { label: "Lessons", value: itemsCounts.lessons },
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
