import { NavBar } from "@/components/NavBar";

export default function LoginPage() {
  return (
    <>
      <NavBar />
      <main>
        <form>
          <label>
            <span>User Name: </span>
            <input type="text" name="userName" placeholder="...pedro" />
          </label>
          <label>
            <span>Password: </span>
            <input type="password" name="password" placeholder="...1234qwer" />
          </label>
          <div className="buttons-box">
            <button type="submit">Send</button>
            <button type="reset">Cancel</button>
          </div>
        </form>
      </main>
    </>
  );
}
