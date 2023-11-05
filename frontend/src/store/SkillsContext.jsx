"use client";

import React, { useState, createContext, useEffect, useContext } from "react";
import useSkillSet from "../hooks/useSkillSet";
import AuthenticationContext from "./AuthenticationContext";

const options = [
    {
        skill: "Synopsys",
        checked: false
    },
    {
        skill: "UX Design",
        checked: false
    },
    {
        skill: "Z3",
        checked: false
    },
    {
        skill: "Flask",
        checked: false
    },
    {
        skill: "Communication",
        checked: false
    },
    {
        skill: "Pandas",
        checked: false
    },
    {
        skill: "Java",
        checked: false
    },
    {
        skill: "ArcGIS",
        checked: false
    },
    {
        skill: "Power BI",
        checked: false
    },
    {
        skill: "Robotics Control",
        checked: false
    },
    {
        skill: "c++",
        checked: false
    },
    {
        skill: "Analog Design",
        checked: false
    },
    {
        skill: "FPGA",
        checked: false
    },
    {
        skill: "HTML",
        checked: false
    },
    {
        skill: "SQL",
        checked: false
    },
    {
        skill: "Blackboard",
        checked: false
    },
    {
        skill: "Software Development Tools",
        checked: false
    },
    {
        skill: "Technical Writing",
        checked: false
    },
    {
        skill: "Power Electronics",
        checked: false
    },
    {
        skill: "Patience",
        checked: false
    },
    {
        skill: "Canvas LMS",
        checked: false
    },
    {
        skill: "Git",
        checked: false
    },
    {
        skill: "Tableau",
        checked: false
    },
    {
        skill: "Google Data Studio",
        checked: false
    },
    {
        skill: "Figma",
        checked: false
    },
    {
        skill: "Object Oriented Programming",
        checked: false
    },
    {
        skill: "Solidworks",
        checked: false
    },
    {
        skill: "Unreal Engine",
        checked: false
    },
    {
        skill: "Excel",
        checked: false
    },
    {
        skill: "MATLAB",
        checked: false
    },
    {
        skill: "VHDL",
        checked: false
    },
    {
        skill: "Docker",
        checked: false
    },
    {
        skill: "Machine Learning",
        checked: false
    },
    {
        skill: "Ansys",
        checked: false
    },
    {
        skill: "NLTK",
        checked: false
    },
    {
        skill: "Digital Design",
        checked: false
    },
    {
        skill: "Linux",
        checked: false
    },
    {
        skill: "AutoCAD",
        checked: false
    },
    {
        skill: "NumPy",
        checked: false
    },
    {
        skill: "Adobe Photoshop",
        checked: false
    },
    {
        skill: "Google Classroom",
        checked: false
    },
    {
        skill: "Programming Languages",
        checked: false
    },
    {
        skill: "mentoring",
        checked: false
    },
    {
        skill: "Google Tag Manager",
        checked: false
    },
    {
        skill: "Electronics",
        checked: false
    },
    {
        skill: "Electrical Machines",
        checked: false
    },
    {
        skill: "Water Quality Modeling",
        checked: false
    },
    {
        skill: "Environmental Chemistry",
        checked: false
    },
    {
        skill: "Power Systems",
        checked: false
    },
    {
        skill: "PowerPoint",
        checked: false
    },
    {
        skill: "research",
        checked: false
    },
    {
        skill: "Software Design Patterns",
        checked: false
    },
    {
        skill: "java",
        checked: false
    },
    {
        skill: "HTML\/CSS",
        checked: false
    },
    {
        skill: "Truffle",
        checked: false
    },
    {
        skill: "PCB Design",
        checked: false
    },
    {
        skill: "Patent Analysis",
        checked: false
    },
    {
        skill: "Scrum",
        checked: false
    },
    {
        skill: "Cadence",
        checked: false
    },
    {
        skill: "Salesforce",
        checked: false
    },
    {
        skill: "Leadership",
        checked: false
    },
    {
        skill: "Blackboard Learn",
        checked: false
    },
    {
        skill: "Patent Writing",
        checked: false
    },
    {
        skill: "Research",
        checked: false
    },
    {
        skill: "AWS",
        checked: false
    },
    {
        skill: "Verilog",
        checked: false
    },
    {
        skill: "Adobe XD",
        checked: false
    },
    {
        skill: "Geologic Data Systems",
        checked: false
    },
    {
        skill: "Problem Solving",
        checked: false
    },
    {
        skill: "Critical Thinking",
        checked: false
    },
    {
        skill: "Sketch",
        checked: false
    },
    {
        skill: "Hadoop",
        checked: false
    },
    {
        skill: "Google Analytics",
        checked: false
    },
    {
        skill: "SystemVerilog",
        checked: false
    },
    {
        skill: "Robotics Mechanics",
        checked: false
    },
    {
        skill: "Google Cloud Platform",
        checked: false
    },
    {
        skill: "Robotics Programming",
        checked: false
    },
    {
        skill: "NoSQL",
        checked: false
    },
    {
        skill: "SAS",
        checked: false
    },
    {
        skill: "Patent Law",
        checked: false
    },
    {
        skill: "Embedded Systems",
        checked: false
    },
    {
        skill: "TensorFlow",
        checked: false
    },
    {
        skill: "Spring Boot",
        checked: false
    },
    {
        skill: "Teaching",
        checked: false
    },
    {
        skill: "R",
        checked: false
    },
    {
        skill: "Scikit-learn",
        checked: false
    },
    {
        skill: "hadoop",
        checked: false
    },
    {
        skill: "sql",
        checked: false
    },
    {
        skill: "Python",
        checked: false
    },
    {
        skill: "Unity",
        checked: false
    },
    {
        skill: "Agile",
        checked: false
    },
    {
        skill: "Microsoft Project",
        checked: false
    },
    {
        skill: "Control Systems",
        checked: false
    },
    {
        skill: "Solidity",
        checked: false
    },
    {
        skill: "spark",
        checked: false
    },
    {
        skill: "Ethereum",
        checked: false
    },
    {
        skill: "CSS",
        checked: false
    },
    {
        skill: "Canvas",
        checked: false
    },
    {
        skill: "ANSYS",
        checked: false
    },
    {
        skill: "Patent Search",
        checked: false
    },
    {
        skill: "FEA",
        checked: false
    },
    {
        skill: "Data Structures and Algorithms",
        checked: false
    },
    {
        skill: "teaching",
        checked: false
    },
    {
        skill: "Azure",
        checked: false
    },
    {
        skill: "Spark",
        checked: false
    },
    {
        skill: "Adobe Illustrator",
        checked: false
    },
    {
        skill: "Blender",
        checked: false
    },
    {
        skill: "Environmental Engineering",
        checked: false
    },
    {
        skill: "Deep Learning",
        checked: false
    },
    {
        skill: "SolidWorks",
        checked: false
    },
    {
        skill: "python",
        checked: false
    },
    {
        skill: "Kubernetes",
        checked: false
    },
    {
        skill: "Swift",
        checked: false
    },
    {
        skill: "JavaScript",
        checked: false
    }
];

const SkillsContext = createContext({
    setSkills: () => { },
    setFirst: () => { },
    skills: [String],
    first: Number,
});

export function SkillsContextProvider({ children }) {
    const [skills, setSkills] = useState([]);
    const [first, setFirst] = useState(0);
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
                const newResponse = options.map(skill => {
                    const checked = responseData.skills.find(ele => ele.skill === skill.skill)?.checked;
                    if (checked) skill.checked = true;
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

    function setSkillsHandler(skills) {
        setSkills(skills);
        if (first === 0) setFirst(1);
    }

    return (
        <SkillsContext.Provider
            value={{
                setSkills: setSkillsHandler,
                setFirst,
                skills,
                first,
            }}
        >
            {children}
        </SkillsContext.Provider>
    );
};

export default SkillsContext;