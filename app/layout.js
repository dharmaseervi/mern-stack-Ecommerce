import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import CartProvider from "@/components/CartProvider";
import AuthProvider from "@/components/provider";
import GlobalProvider from "@/components/GlobalContex";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mern-Stack | E-commerce website",
  description: "Mern-Stack | E-commerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <GlobalProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
