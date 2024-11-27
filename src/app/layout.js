import "./globals.css";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import MessageBox from "@/components/MessageBox";

export const metadata = {
  title: "Ninja Player | Find your game partner",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/images/logo.png" as="image" />
        <link rel="preconnect" as="font" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
          as="font"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/images/all.jpg" type="image/x-icon" />
      </head>
      <body>
        <SessionProvider>
          <Header />
          {children}
          <MessageBox />
        </SessionProvider>
      </body>
    </html>
  );
}
