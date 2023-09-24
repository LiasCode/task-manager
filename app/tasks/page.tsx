import { NavBar } from "../../components/NavBar";
import { Tasks } from "../../components/Tasks/Tasks";

export default async function TaskPage() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col w-full h-auto justify-start items-center">
        <Tasks />
      </main>
    </>
  );
}
