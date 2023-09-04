import { NavBar } from "@/components/NavBar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <h1>Task Manager, light and fast</h1>
        <h4
          style={{
            margin: "10px 0 0 0",
            fontWeight: "bold",
            color: "#9c9c9c",
          }}
        >
          You can use it without login, but all data will lose when close the
          browser
        </h4>
        <Link
          href="/login"
          style={{
            margin: "10px 0 0 0",
            fontStyle: "italic",
            color: "#9c9c9c",
          }}
        >
          Go to Login
        </Link>
      </main>
    </>
  );
}
