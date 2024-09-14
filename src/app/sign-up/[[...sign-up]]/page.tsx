import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen items-center justify-center flex">
      <SignUp></SignUp>
    </div>
  );
}
