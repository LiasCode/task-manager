import "./task.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks | Task Manager",
  description: "Tasks, light and fast manager.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
