import { FormLogin } from "@/components/FormLogin/FormLogin";
import { NavBar } from "@/components/NavBar";

export default function LoginPage() {
  return (
    <>
      <NavBar />
      <main>
        <FormLogin />
      </main>
    </>
  );
}
