import Navbar from "@/components/Navbar";
import "./globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/Footer";
import MovieModalContainer from "@/components/MovieModalContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginModal from "@/components/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import { Suspense } from "react";

const roboto = Roboto({
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Filmoteka",
  description: "Filmoteka Next.js TypeScript",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000" />
      </head>
      <body className={roboto.className}>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
        <MovieModalContainer />
        <LoginModal />
        <Suspense>
          <Navbar currentUser={currentUser} />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
