import Link from "next/link";

export default function NotSigned() {
  interface authLinks_t {
    label: string;
    link: string;
  }
  const authLinks: authLinks_t[] = [
    { label: "Sign Up", link: "/signIn" },
    { label: "Login", link: "/login" },
  ];
  return (
    <div className="flexCenter flex-col gap-y-[1rem] new-h-screen">
      <div>You're Not Signed</div>
      <ul className="flex gap-x-[1rem]">
        {authLinks.map((e, i) => (
          <li key={i}>
            <Link href={e.link}>{e.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
