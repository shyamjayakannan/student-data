"use client";

import "../styles/global.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
import Topbar from "../components/Topbar/Topbar";
import Notifications from "../components/notification/notifications";
import { AuthenticationContextProvider } from "../store/AuthenticationContext";
import { NotificationContextProvider } from "../store/NotificationContext";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
	const path = usePathname();

	return (
		<html lang="en">
			<meta name="viewport" content="initial-scale=1, width=device-width" />
			<body className={inter.className}>
				<NotificationContextProvider>
					<AuthenticationContextProvider>
						{(!path.includes("/auth") && !path.includes("/resetpassword")) && <Topbar />}
						<Notifications />
						<main>{children}</main>
						<Script />
					</AuthenticationContextProvider>
				</NotificationContextProvider>
			</body>
		</html>
	);
}
