import { NavBar } from "@/components/NavBar";
import { Tasks } from "./Tasks/Tasks";

export default function TaskPage() {
  return (
    <>
      <NavBar />
      <main>
        <Tasks />
      </main>
    </>
  );
}
