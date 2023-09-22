import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes | Task Manager",
  description: "Tasks, light and fast manager.",
};

type RootLayoutProps = { children: React.ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
