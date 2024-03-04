import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tastify",
  description: "Created By Karan Dayani",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg text-text`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
