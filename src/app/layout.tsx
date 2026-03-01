import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import ClientLayout from "./ClientLayout"; // Шинээр үүсгэх файл
import { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

// 1. Metadata-г энд зааж өгснөөр icon.png-г автоматаар танина
export const metadata: Metadata = {
  title: "Барилгын Тооцоолуур",
  description: "Материалын тооцоо гаргах систем",
  icons: {
    icon: "/icon.png", // app хавтсанд байгаа icon.png-г зааж өгнө
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}