"use client";

import classes from "../../../styles/dashboard/dashboard.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Dpage from "../../../components/dashboard/Dpage";
import Companies from "../../../components/dashboard/Companies";
import Students from "../../../components/dashboard/Students";
import Shortlist from "../../../components/dashboard/ShortList";
import Settings from "../../../components/dashboard/Settings/Settings";
import Leftsidebar from "../../../components/leftsidebar/Leftsidebar";
import LoadingWait from "../../../ui/loadingWait";
import { SkillsContextProvider } from "../../../store/SkillsContext";

const Layout = () => {
    const [component, setComponent] = useState(<Dpage />);
    const router = useRouter();

    useEffect(() => {
        switch (router.query.id) {
            case "companies":
                setComponent(<Companies />);
                break;
            case "students":
                setComponent(<Students />);
                break;
            case "shortlist":
                setComponent(<Shortlist />);
                break;
            case "settings":
                setComponent(<Settings />);
                break;
            default: setComponent(<Dpage />);
        }
    }, [router.query.id]);

    return (
        <LoadingWait>
            <div className={classes.dashboard_container}>
                <Leftsidebar />
                <main style={{ width: "100%", height: "100%" }}>
                    <SkillsContextProvider>
                        {component}
                    </SkillsContextProvider>
                </main>
            </div>
        </LoadingWait>
    );
};

export default Layout;