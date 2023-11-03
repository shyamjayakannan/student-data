"use client";

import { useContext } from "react";
import classes from "../../../styles/dashboard/Settings/Modal.module.css";
import SkillsContext from "../../../store/SkillsContext";

export default function Modal(props) {
    const skillsCtx = useContext(SkillsContext);

    function submit(e) {
        e.preventDefault();
        skillsCtx.setSkills(skills => {
            const newSkills = skills.map((skill, index) => {
                return { ...skill, checked: e.target[index].checked };
            });
            return newSkills;
        });
        props.close();
    }

    return (
        <div className={classes.backdrop} style={props.style} data-type="backdrop" onClick={e => e.target.getAttribute("data-type") === "backdrop" ? props.close() : {}}>
            <form onSubmit={submit} className={classes.container}>
                <div className={classes.options}>
                    {skillsCtx.skills.map((skill, index) => {
                        return (
                            <div key={index}>
                                <input className={classes["styled-checkbox"]} defaultChecked={skill.checked} id={skill.skill} type="checkbox" />
                                <label htmlFor={skill.skill}>{skill.skill}</label>
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