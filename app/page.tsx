import { NavBar } from "@/components/NavBar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col w-full h-auto justify-center items-center">
        <h1 className="text-7xl text-center">
          Task Manager
          <br />
          <i className="font-extralight text-primaryDetail mr-4">light</i>&
          <i className="font-extralight text-primaryDetail ml-4">fast</i>
        </h1>
        <h4 className="mt-4 font-medium italic text-center text-slate-500">
          You can use it without login, but all data will lose when close the
          browser
        </h4>
        <Link
          href="/login"
          className="mt-3 font-semibold text-white text-center"
        >
          Go to Login
        </Link>
      </main>
    </>
  );
}
