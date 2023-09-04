import "./notePage.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes | Task Manager",
  description: "Notes, light and fast manager.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
