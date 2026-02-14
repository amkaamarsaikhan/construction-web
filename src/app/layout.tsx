'use client'; // State ашиглах тул заавал нэмнэ

import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="mn">
      <body>
        <AuthProvider>
          <div className="flex min-h-screen bg-white">
            {/* Sidebar-т state дамжуулах */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0">
              {/* Navbar-т нээх функцийг дамжуулах */}
              <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
              
              <main className="flex-1">
                {children}
              </main>
              
              <Footer />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}