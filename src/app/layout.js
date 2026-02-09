
import ThemeToggle from "@/components/ThemeToggle";
import { Toaster } from 'sonner'
import "./globals.css";

export const metadata = {
  title: "Transporte Urbano - Sistema de Gestión",
  description: "Sistema de gestión para transporte urbano",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <ThemeToggle />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
