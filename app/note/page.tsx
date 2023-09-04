import { NavBar } from "@/components/NavBar";
import { Notes } from "./Notes/Notes";

export default function NotePage() {
  return (
    <>
      <NavBar />
      <main>
        <h1>Notes</h1>
        <Notes />
      </main>
    </>
  );
}
