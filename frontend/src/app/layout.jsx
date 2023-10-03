import "../styles/global.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
import Topbar from "../components/Topbar/Topbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body className={inter.className}>
        <Topbar />
        <main>
          <section>{children}</section>
        </main>

        {/* <Script /> */}
      </body>
    </html>
  );
}
