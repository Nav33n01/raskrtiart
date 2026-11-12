import type { Metadata } from "next";
import Navbar from "./components/navbar";
import "./globals.css";
import Footer from "./components/footer";
import WhatsAppChat from "./components/WhatsAppChat";
import WelcomeModal from "./components/WelcomeModal";

export const metadata: Metadata = {
  title: "Raskrti Art",
  description: "Art and Craft for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <WelcomeModal />
        <Navbar />
        <div className="mt-16 md:mt-20">
          {children}
          <WhatsAppChat />
        </div>
        <Footer />
      </body>
    </html>
  );
}
