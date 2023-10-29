"use client";

import { useContext, useEffect, useState } from "react";
import classes from "../../../styles/dashboard/Settings/Modal.module.css";
import AuthenticationContext from "../../../store/AuthenticationContext";
import useSkillSet from "../../../hooks/useSkillSet";

const options = [
    {
        skill: "yay",
        checked: false,
    },
    {
        skill: "wow",
        checked: false,
    },
    {
        skill: "super",
        checked: false,
    },
    {
        skill: "duper",
        checked: false,
    },
    {
        skill: "amazing",
        checked: false,
    },
];

export default function Modal(props) {
    const [skills, setSkills] = useState([]);
    const authenticationCtx = useContext(AuthenticationContext);
    const SkillSet = useSkillSet();

    useEffect(() => {
        if (authenticationCtx.details.id === "") return;

        (async () => {
            const responseData = await SkillSet(
                { userId: authenticationCtx.details.id },
                "getSkillSet",
            );

            if (responseData.type === "Success") {
                const newResponse = responseData.skills.map(skill => {
                    return { skill: skill.skill, checked: skill.checked };
                })
                setSkills(newResponse);
            }
            else if (responseData.type === "Error") {
                setSkills(options);
                await SkillSet(
                    { userId: authenticationCtx.details.id, skills: options },
                    "createSkillSet",
                );
            }
        })();
    }, [authenticationCtx.details]);

    useEffect(() => {
        if (skills.length === 0) return;
        // console.log(skills);
        (async () => {
            await SkillSet(
                { userId: authenticationCtx.details.id, skills },
                "updateSkillSet",
            );
        })();
    }, [skills]);

    function submit(e) {
        e.preventDefault();
        setSkills(skills => {
            const newSkills = skills.map((skill, index) => {
                return { ...skill, checked: e.target[index].checked };
            });
            console.log(newSkills)
            return newSkills;
        });
        props.close();
    }

    return (
        <div className={classes.backdrop} style={props.style} data-type="backdrop" onClick={e => e.target.getAttribute("data-type") === "backdrop" ? props.close() : {}}>
            <form onSubmit={submit} className={classes.container}>
                <div className={classes.options}>
                    {skills.map((skill, index) => {
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