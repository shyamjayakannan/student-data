"use client";

import { useState } from "react";
import classes from "../../../styles/dashboard/Settings/Modal.module.css";
import { useRouter } from 'next/router';
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
    const [checkedOptions, setCheckedOptions] = useState([]);

    const handleCheckboxChange = (option) => {
    if (checkedOptions.includes(option)) {
        setCheckedOptions(checkedOptions.filter((item) => item !== option));
    } else {
        setCheckedOptions([...checkedOptions, option]);
    }
};
const router= useRouter();
const handleSubmit = (e) => {
  e.preventDefault();
  const checkedLabels = options.filter((option, index) => checkedOptions.includes(option));
  console.log('Checked Labels:', checkedLabels);
  props.close();
router.push('/dashboard/companies');

};

    return (
        <div className={classes.backdrop} data-type="backdrop" onClick={e => e.target.getAttribute("data-type") === "backdrop" ? props.close : {}}>
            <form className={classes.container} onSubmit={handleSubmit}>
                <div className={classes.options}>
                    {options.map((option, index) => {
                        return (
                            <div key={index}>
                                <input className={classes["styled-checkbox"]} onChange={() => handleCheckboxChange(option)}
                  checked={checkedOptions.includes(option)} id={option} type="checkbox" />
                                <label htmlFor={option}>{option}</label>
                            </div>
                        );
                    })}
                </div>
                <div className={classes.buttons}>
                    <button type="button" onClick={props.close}>Cancel</button>
                    <input type="submit" value={props.action}></input>
                </div>
            </form>
        </div>
    );
}