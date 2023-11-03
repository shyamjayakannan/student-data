"use client";

import React, { useState, createContext, useEffect, useContext } from "react";
import useSkillSet from "../hooks/useSkillSet";
import AuthenticationContext from "./AuthenticationContext";

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

const SkillsContext = createContext({
    setSkills: () => {},
    skills: [String],
});

export function SkillsContextProvider({ children }) {
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
    }, [authenticationCtx.details.id]);

    useEffect(() => {
        if (skills.length === 0) return;
        (async () => {
            await SkillSet(
                { userId: authenticationCtx.details.id, skills },
                "updateSkillSet",
            );
        })();
    }, [skills]);

    return (
        <SkillsContext.Provider
            value={{
                setSkills,
                skills,
            }}
        >
            {children}
        </SkillsContext.Provider>
    );
};

export default SkillsContext;