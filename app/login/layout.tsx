import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Task Manager",
  description: "Login for Task and Notes manager, light and fast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
