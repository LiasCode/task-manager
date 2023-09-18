import { SessionContextProvider } from "@/components/SessionContext";
import "./globals.css";
import type { Metadata } from "next";
import 'animate.css';

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task and Notes manager, light and fast.",
  assets: [
    "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <SessionContextProvider>{children}</SessionContextProvider>
      </body>
    </html>
  );
}
