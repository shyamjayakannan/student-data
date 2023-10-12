// "use client";

import "../styles/global.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
// import Script from "next/script";
// import Topbar from "../components/Topbar/Topbar";
// import Notifications from "../components/notification/notifications";
// import { AuthenticationContextProvider } from "../store/AuthenticationContext";
// import { NotificationContextProvider } from "../store/NotificationContext";
// import { usePathname } from "next/navigation";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import Wrapper from "./wrapper";
import Script from "next/script";

export default function RootLayout({ children }) {
	// const path = usePathname();

	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<Script strategy="beforeInteractive">
					{`
						const themeLocalStorage   = localStorage.getItem('theme')
						const themeSystem         = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
						if (themeLocalStorage) document.querySelector(':root').dataset.theme = themeLocalStorage;
						else {
							document.querySelector(':root').dataset.theme = themeSystem;
							localStorage.setItem("theme", themeSystem);
						}
                	`}
				</Script>
			</head>
			<body className={inter.className}>
				<Wrapper>
					{children}
				</Wrapper>
			</body>
		</html>
	);
}
