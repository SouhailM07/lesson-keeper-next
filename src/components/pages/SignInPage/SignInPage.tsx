import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import SignIn from "@/components/molecules/SignIn/SignIn";

export default function SignInPage() {
  return (
    <main className="h-screen flex-col gap-y-[1rem] flexCenter">
      <PageTitle title="Sign In" />
      <SignIn />
    </main>
  );
}
