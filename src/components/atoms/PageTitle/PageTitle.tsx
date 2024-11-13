export default function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="text-[2rem] underline-offset-[0.7rem] underline ">
      {title}
    </h1>
  );
}
