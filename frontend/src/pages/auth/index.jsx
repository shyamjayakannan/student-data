"use client";

import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../store/AuthenticationContext";
import LogIn from "../../components/authentication/LogIn";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "../../ui/loadingSpinner";
import classes from "../../styles/home.module.css";
import SignUp from "../../components/authentication/SignUp";
import GoogleAuth from "../../components/authentication/parts/GoogleAuth";
export default function Auth() {
  const authenticationCtx = useContext(AuthenticationContext);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticationCtx.isLoggedIn && pathname === "/auth") {
      setLoading(true);
      router.push("/");
    } else setLoading(false);
  }, []);

  function toggle() {
    if (authenticationCtx.open.LogInOpen) {
      authenticationCtx.hide("LogInOpen");
      authenticationCtx.show("signupOpen");
    } else if (authenticationCtx.open.signupOpen) {
      authenticationCtx.hide("signupOpen");
      authenticationCtx.show("LogInOpen");
    }
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          {authenticationCtx.open.LogInOpen && (
            <>
              <LogIn toggle={toggle} />
              <GoogleAuth LogInOpen={authenticationCtx.open.LogInOpen} />
              <p style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0" }}>
                New Here?
                <button onClick={toggle} className={classes.but1}>
                  Register
                </button>
              </p>
            </>
          )}
          {authenticationCtx.open.signupOpen && (
            <>
              <SignUp toggle={toggle} />
              <GoogleAuth LogInOpen={authenticationCtx.open.LogInOpen} />
              <p style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0" }}>
                Already Registered?
                <button onClick={toggle} className={classes.but1}>
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
