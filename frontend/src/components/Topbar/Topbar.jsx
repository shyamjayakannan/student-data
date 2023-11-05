"use client";

import React, { useState } from "react";
import Link from "next/link";
import classes from "../../styles/topbar/topbar.module.css";
import AuthenticationContext from "../../store/AuthenticationContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { googleLogout } from "@react-oauth/google";
import ThemeToggler from "./theme.util";
import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from 'next/image'
export default function Topbar() {
	const authenticationCtx = useContext(AuthenticationContext);
	const { removePersonalDetails } = useLocalStorage();
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
				<Link href="/aboutus" className={classes.navlinks}>
					<div className={classes.otherlinks}>
						AboutUs
					</div>
				</Link>
				<Link href="/" className={classes.logolink}>
					
					<p style={{ margin: "0",display:'flex',alignItems:'center',justifyContent:'center' }}><Image src="/images/logo.png" style={{marginTop:'5px'}}alt="logo"  width={80} height={60}/>StudentPedia</p>
				</Link>
				<div className={classes.signbtn}>
					<ThemeToggler />
					{
						authenticationCtx.isLoggedIn && pathname == '/dashboard/dpage' ? (
							<Link
								href="/"
								className={classes.dashbtn}
							>
								Home
							</Link>

						) : (
							<Link
								href="/dashboard"
								className={classes.dashbtn}
							>
								Dashboard
							</Link>
						)
					}
					{authenticationCtx.isLoggedIn ? <button onClick={logout} className={classes.signupbtn}>Sign Out</button> :
						<Link href="/auth" className={classes.signupbtn}>Sign In</Link>}
				</div>
			</nav>
		</div>
	);
}
