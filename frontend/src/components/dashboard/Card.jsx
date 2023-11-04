"use clent";

import Image from "next/image";
import classes from "../../styles/dashboard/Card.module.css";

export default function Card({ data }) {

    return (
        <div className={classes.container}>
            <div style={{ height: "100px", width: "200px", position: "relative" }}>
                <Image priority src={`https://logo.clearbit.com/${data.Link}`} alt="company" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ borderRadius: "10px", objectFit: "contain" }} />
            </div>
            <hr />
            <div className={classes.info}>
                <p>
                    <strong>Company</strong>
                    <br />
                    {data.Company}
                </p>
                <p>
                    <strong>Selected</strong>
                    <br />
                    {data.Selected}
                </p>
                <p>
                    <strong>CTC(in Lakhs)</strong>
                    <br />
                    {data["CTC"] ? data["CTC"] : "Not Revealed"}
                </p>
                <p>
                    <strong>CGPA</strong>
                    <br />
                    {data.CGPA ? data.CGPA : "NA"}
                </p>
                <p>
                    <strong>Job Profile</strong>
                    <br />
                    {data["JobProfile"]}
                </p>
                <p>
                    <strong>Location(s)</strong>
                    <br />
                    {data.Venue}
                </p>
            </div>
        </div>
    );
}