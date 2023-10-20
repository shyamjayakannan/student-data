"use client";

import React, { useState } from "react";
import Link from "next/link";
import classes from "../../styles/topbar/topbar.module.css";
import AuthenticationContext from "../../store/AuthenticationContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { googleLogout } from "@react-oauth/google";
import ThemeToggler from "./theme.util";
import { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
export default function Topbar() {
	const authenticationCtx = useContext(AuthenticationContext);
	const { removePersonalDetails } = useLocalStorage();
	const router = useRouter();
	const pathname = usePathname();
	const [pop, setPop] = useState(false);

	useEffect(() => {
		function doPop() {
			setPop(window.scrollY > 20);
		}
		doPop();
		window.addEventListener("scroll", doPop);
		return () => removeEventListener("scroll", doPop);
	}, []);

	function logout() {
		googleLogout();
		authenticationCtx.setLogoutButton(true);
		authenticationCtx.setLoggedIn(false);
		authenticationCtx.setDetails("");
		removePersonalDetails();
	}

	return (
		<div className={classes.main}>
			<nav className={`${classes.navbar} ${pop ? classes["navbar-pop"] : ""}`}>
				<div className={classes.otherlinks}>
					<Link href="/aboutus" className={classes.navlinks}>
						AboutUs
					</Link>
					{/* <Link href="services" className={classes.navlinks}>
					Services
				</Link>
				<Link href="resources" className={classes.navlinks}>
					Resources
				</Link> */}
				</div>
				<Link href="/" className={classes.logolink}>
					{/* <Image src="" alt="logo" /> */}
					<p style={{ margin: "0" }}>Logo</p>
				</Link>
				<div className={classes.signbtn}>
					<ThemeToggler />
					{
						authenticationCtx.isLoggedIn && pathname == '/dashboard' ? (
							<button
								onClick={(e) => {
									e.preventDefault();
									router.push("/");
								}}
								className={classes.dashbtn}
							>
								Home
							</button>

						) : (
							<button
								onClick={(e) => {
									e.preventDefault();
									router.push("/dashboard");
								}}
								className={classes.dashbtn}
							>
								Dashboard
							</button>
						)
					}
					{authenticationCtx.isLoggedIn ? <button onClick={logout} className={classes.signupbtn}>Sign Out</button> :
						<Link href="/auth" className={classes.signupbtn}>Sign In</Link>}
				</div>
			</nav>
		</div>
	);
}
