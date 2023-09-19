import { SessionContextProvider } from "@/components/SessionContext";
import "./tasksPage.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks | Task Manager",
  description: "Notes, light and fast manager.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionContextProvider>{children}</SessionContextProvider>;
}
