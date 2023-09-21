import { FormLogin } from "@/components/FormLogin/FormLogin";
import { NavBar } from "@/components/NavBar";
import loginStyles from "./login.module.css";

export default function LoginPage() {
  return (
    <>
      <NavBar />
      <main className={loginStyles.loginMain}>
        <FormLogin />
      </main>
    </>
  );
}
