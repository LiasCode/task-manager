import { NavBar } from "@/components/NavBar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <h1
          style={{
            fontWeight: "bolder",
            lineHeight: "40px",
            textAlign: "center",
            fontSize: "2.5rem",
            letterSpacing: "2px",
          }}
        >
          Task Manager, <i>light</i> and <i>fast</i>
        </h1>
        <h4
          style={{
            margin: "10px 0 0 0",
            fontWeight: "bold",
            fontStyle: "italic",
            color: "#9c9c9c",
            textAlign: "center",
          }}
        >
          You can use it without login, but all data will lose when close the
          browser
        </h4>
        <Link
          href="/login"
          style={{
            margin: "10px 0 0 0",
            fontWeight: "bold",
            color: "#9c9c9c",
            textAlign: "center",
          }}
        >
          Go to Login
        </Link>
      </main>
    </>
  );
}
