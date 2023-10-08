"use client";

import React, { useContext } from "react";
import Link from "next/link";
import classes from "../../styles/topbar.module.css";
import AuthenticationContext from "../../store/AuthenticationContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useRouter } from "next/navigation";

export default function Topbar() {
	const authenticationCtx = useContext(AuthenticationContext);
	const { removePersonalDetails } = useLocalStorage();
	const router = useRouter()

	function logout() {
		authenticationCtx.setLoggedIn(false);
		removePersonalDetails();
	}

	return (
		<nav className={classes.navbar}>
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
				<p className={classes.logo}>Logo</p>
			</Link>
			<div className={classes.signbtn}>
				{authenticationCtx.isLoggedIn ? <button onClick={logout} className={classes.signupbtn}>Sign Out</button> :
				<Link href="/auth" className={classes.signupbtn}>Sign In</Link>}
			</div>
		</nav>
	);
}
