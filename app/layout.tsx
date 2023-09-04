import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task and Notes manager, light and fast.",
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
