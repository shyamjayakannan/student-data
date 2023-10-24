import LoadingWait from "../../ui/loadingWait";
import PreviousChat from "./PreviousChats";

export default function Layout(props) {
    return (
        <LoadingWait>
            <div style={{ display: "flex", height: "calc(100vh - 68px)", position: "relative" }}>
                <PreviousChat />
                <main style={{ width: "100%", height: "100%" }}>
                    {props.children}
                </main>
            </div>
        </LoadingWait>
    );
}