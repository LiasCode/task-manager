import "./notes.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes | Task Manager",
  description: "Tasks, light and fast manager.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
