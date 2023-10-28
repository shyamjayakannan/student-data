"use client";

import classes from "../../../styles/dashboard/Settings/Modal.module.css";

const options = [
    "ML/AI",
    "Web Developer",
    "Software Developer",
    "Technical Consultant",
    "Research Consultant",
    "Research Trainee",
    "Management Trainee",
];

export default function Modal(props) {
    return (
        <div className={classes.backdrop} data-type="backdrop" onClick={e => e.target.getAttribute("data-type") === "backdrop" ? props.close() : {}}>
            <form className={classes.container}>
                <div className={classes.options}>
                    {options.map((option, index) => {
                        return (
                            <div key={index}>
                                <input className={classes["styled-checkbox"]} id={option} type="checkbox" />
                                <label htmlFor={option}>{option}</label>
                            </div>
                        );
                    })}
                </div>
                <div className={classes.buttons}>
                    <button type="button" onClick={props.close}>Cancel</button>
                    <input type="submit">{props.action}</input>
                </div>
            </form>
        </div>
    );
}