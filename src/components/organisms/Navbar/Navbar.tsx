export default function Navbar() {
  interface ISchoolData {
    label: string;
    value: number;
  }
  const schoolData: ISchoolData[] = [
    { label: "Seasons", value: 0 },
    { label: "Modules", value: 0 },
    { label: "Lessons", value: 0 },
  ];
  return (
    <header className="sticky top-0 bg-black text-white h-[3.8rem] px-[1rem] ">
      <nav className="h-full flexBetween">
        <h1 className="text-[1.4rem]">Lessons Keeper</h1>
        <ul className="flex gap-[1rem]">
          {schoolData.map((e, i) => (
            <li key={i}>
              <span>{e.label} : </span>
              <span>{e.value}</span>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
