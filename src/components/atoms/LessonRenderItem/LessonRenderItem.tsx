import { faDownload, faGear, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LessonRenderItem() {
  let lesson_opt = [faDownload, faGear, faBars];
  return (
    <div className="p-[1rem] mx-auto max-w-[50rem] border rounded-sm border-gray-500 h-[2.6rem] flexBetween">
      <p>title</p>
      <div className="flex gap-x-[1.5rem] text-[1.1rem]">
        {lesson_opt.map((e, i) => (
          <FontAwesomeIcon key={i} icon={e} />
        ))}
      </div>
    </div>
  );
}
