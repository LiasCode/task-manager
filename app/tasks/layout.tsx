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
  return children;
}
