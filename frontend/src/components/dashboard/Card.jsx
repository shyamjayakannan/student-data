"use clent";

import Image from "next/image";
import classes from "../../styles/dashboard/Card.module.css";

export default function Card({ data }) {

    return (
        <div className={classes.container}>
            <Image priority src={`https://logo.clearbit.com/${data.Link}`} alt="company" width={150} height={150} style={{borderRadius: "20px"}} />
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
                    {data["CTC(in Lakhs)"] ? data["CTC(in Lakhs)"] : "Not Revealed"}
                </p>
                <p>
                    <strong>CGPA</strong>
                    <br />
                    {data.CGPA ? data.CGPA : "NA"}
                </p>
                <p>
                    <strong>Job Profile</strong>
                    <br />
                    {data["Job Profile"]}
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