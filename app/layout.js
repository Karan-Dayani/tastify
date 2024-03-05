import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header";
import AuthProvider from "./(components)/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tastify",
  description: "Created By Karan Dayani",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} bg-primary text-secondary`}>
          <Header />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
