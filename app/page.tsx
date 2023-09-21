import { NavBar } from "@/components/NavBar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main
        style={{
          width: "100%",
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontWeight: "500",
            textAlign: "center",
            fontSize: "5rem",
          }}
        >
          Task Manager
          <br />
          <i
            style={{
              fontWeight: "200",
              color: "var(--primary-detail)",
            }}
          >
            light
          </i>{" "}
          &
          <i
            style={{
              fontWeight: "200",
              color: "var(--primary-detail)",
              margin: "0 0 0 10px",
            }}
          >
            fast
          </i>
        </h1>
        <h4
          style={{
            margin: "10px 0 0 0",
            fontWeight: "500",
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
            margin: "30px 0 0 0",
            fontWeight: "600",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Go to Login
        </Link>
      </main>
    </>
  );
}
