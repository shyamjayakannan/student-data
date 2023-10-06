"use client";

import Loader from "./loader";

export default function LoadingSpinner() {
    return (
        <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Loader />
        </div>
    );
}