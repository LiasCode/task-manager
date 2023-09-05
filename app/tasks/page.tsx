import { NavBar } from "@/components/NavBar";
import { Tasks } from "./Tasks/Tasks";

export default async function TaskPage() {
  return (
    <>
      <NavBar />
      <main>
        <Tasks />
      </main>
    </>
  );
}
