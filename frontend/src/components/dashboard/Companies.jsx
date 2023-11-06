"use client";

import React, { useContext, useEffect, useState } from 'react'
import classes from "../../styles/dashboard/companies.module.css";
import Card from './Card';
import data from "../../pages/dashboard/companies/companies.json";
import CardSkeleton from './CardSkeleton';
import SearchBar from './SearchBar';
import AuthenticationContext from '../../store/AuthenticationContext';
import SkillsContext from '../../store/SkillsContext';
import usePopup from '../../ui/Popup';
import { useRouter } from 'next/router';
import Image from 'next/image'

const dummy = [
  {
    "About Company": "```\n{\n  \"title\": \"Leading With Data: Srikanth Velamakanni, Co-founder and Group CEO of Fractal\",\n  \"summary\": [\n    \"Srikanth Velamakanni co-founded Fractal in 2000 with a vision to power every human decision in the enterprise\",\n    \"He is also the Co-founder and Trustee of Plaksha University and a member of the NASSCOM Executive Council\",\n    \"Srikanth considers himself a lifelong student of mathematics, behavioral economics, neuroscience and consumer behavior\",\n    \"Watch as Srikanth delves into:\",\n    \"His experience on the way the AI industry evolved over the last couple of decades\",\n    \"His advice to stay relevant with the advancement in the AI field\",\n    \"The way AI is going to change how and what we work on in the future\",\n    \"The AI, Engineering and Design Framework followed by Fractal\",\n    \"How he sees Fractal evolving over the next 100 years\",\n    \"Shares his passion for teaching and the books he recommends!\"\n  ]\n}\n```",
    "CGPA": 5.5,
    "CTC": 18,
    "Company": "Fractal Analytics Pvt. Ltd. ",
    "Id": 82,
    "JobProfile": "Imagineer",
    "Selected": 12,
    "Skills": "3D Modelling, Animation, VFX, Game Design, Storyboarding, Level Design, Programming, Art Direction",
    "Venue": "Hyderabad/Banglore"
  },
  {
    "About Company": "{\n  \"title\": \"Jaguar Land Rover India reports strong Q1 FY24 sales\",\n  \"summary\": [\n    \"Retail sales increase by 102% vs Q1 FY23\",\n    \"Demand for Range Rover, Range Rover Sport and Defender has seen a phenomenal growth of 209%\",\n    \"Contributing 78% of the current order book\"\n  ]\n}",
    "CGPA": 7,
    "CTC": 20,
    "Company": "Jaguar Land Rover India ",
    "Id": 122,
    "JobProfile": "Graduate Electronics Engineer Trainee",
    "Selected": 3,
    "Skills": "C, C++, Embedded Systems, Linux, Python, Verilog, VHDL, Git",
    "Venue": "Banglore  "
  },
  {
    "About Company": "```\n{\n  \"title\": \"The Importance of Sleep\",\n  \"summary\": [\n    \"Sleep is essential for both physical and mental health\",\n    \"Lack of sleep can lead to a number of health problems, including obesity, heart disease, and diabetes\",\n    \"Getting enough sleep is important for children's development\",\n    \"There are a number of things you can do to improve your sleep habits\",\n    \"If you have trouble sleeping, talk to your doctor\"\n  ]\n}\n```",
    "CGPA": 7.5,
    "CTC": 29,
    "Company": "Swiggy-Bundl Technologies Pvt. Ltd. ",
    "Id": 225,
    "JobProfile": "Software Development Engineer",
    "Selected": 3,
    "Skills": "Programming Languages, Data Structures and Algorithms, Object-Oriented Programming, Software Design and Architecture, Testing, Version Control, Continuous Integration and Delivery (CI/CD), DevOps",
    "Venue": "Banglore"
  },
  {
    "About Company": "```\n{\n  \"title\": \"Harness Launches Gitness™, a New Open-Source Git Repository and Harness Code Repository\",\n  \"summary\": [\n    \"Harness Launches Gitness™, a New Open-Source Git Repository\",\n    \"Harness Code Repository is the hosted and managed version of Gitness with premium features\",\n    \"Gitness can run on the smallest virtual machine and integrates seamlessly with Harness CI/CD and other tools\",\n    \"Harness Code Repository adds features like added governance, policy enforcement, and additional integrations\",\n    \"Code Repository will make it easier for companies to scale their dev teams with ease\"\n  ]\n}\n```",
    "CGPA": 7,
    "CTC": 30,
    "Company": "Harness ",
    "Id": 97,
    "JobProfile": "Software Development Engineer",
    "Selected": 3,
    "Skills": "Python, Java, C++, SQL, NoSQL, Web development, Machine learning, Cloud computing",
    "Venue": "Banglore  "
  },
  {
    "About Company": "{\n  \"title\": \"Navigating the tightrope of balancing costs and carbon emissions\",\n  \"summary\": [\n    \"Economic Pressures on Containing Cost\",\n    \"Delivery Management Solutions\",\n    \"Leveraging Routing and Optimization Solutions\",\n    \"2030 Carbon Emissions Commitments\",\n    \"Parcel Lockers and PUDO Growth\"\n  ]\n}",
    "CGPA": 7,
    "CTC": 20,
    "Company": "Fareye ",
    "Id": 76,
    "JobProfile": "Software Development Engineer",
    "Selected": 12,
    "Skills": "Programming Languages, Data Structures and Algorithms, Object-Oriented Programming, Software Design and Architecture, Testing, Version Control, Continuous Integration and Delivery, DevOps",
    "Venue": "Noida"
  }
];

let companies_list = [];
let preset = "";

const Companies = () => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState(companies_list.length > 0 ? companies_list : data["2020-21"]);
  const authenticationCtx = useContext(AuthenticationContext);
  const skillsCtx = useContext(SkillsContext);
  const { popup, setPopup, Component } = usePopup();
  const router = useRouter();

  useEffect(() => {
    if (authenticationCtx.details.id === "") return;

    if (authenticationCtx.details.firstTime) setPopup(true);
  }, [authenticationCtx.details.id]);

  useEffect(() => {
    if (skillsCtx.skills.length === 0) return;

    if (skillsCtx.first === 1) {
      let arr = " ";
      skillsCtx.skills.forEach(obj => {
        if (obj.checked) arr += obj.skill + " ";
      })
      console.log(arr)
      sendData(arr);
      skillsCtx.setFirst(2);
    }
  }, [skillsCtx.skills]);

  async function sendData(query) {
    preset = query;
    setLoading(true);
    const arr = [];
    skillsCtx.skills.forEach(obj => {
      if (obj.checked) arr.push(obj.skill);
    })
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL}/profile`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, skills: arr }),
        }
      );
      const pythonResponse = await response.json();
      // const pythonResponse = await new Promise(resolve => setTimeout(() => resolve(dummy), 1000));
      setCompanies(_ => {
        const newResponse = pythonResponse.map(company => {
          for (const key in company) {
            const item = company[key];
            if (typeof item === "string") company[key] = item.trim();
          }
          company.Link = data["2020-21"].find(elem => elem.Company === company.Company)?.Link;
          return company;
        });
        companies_list = newResponse;
        return newResponse;
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <SearchBar preset={preset} sendData={sendData} />
      </div>
      <div className={classes.compcardsbox}>
        {loading ? Array(6).fill(0).map((_, index) => <CardSkeleton key={index} />) : companies.length != 0 ? companies.map((item, index) => <Card key={index} data={item} />) : <div className={classes.noresult}><Image src="/images/empty.png" alt="no result" width={500} height={500} /><p>NO RESULT FOUND</p></div>}
      </div>
      {popup && <Component function={() => router.push("/dashboard/settings")} title="Skill Preferences" message="Looks like you haven't set skill preferences yet. Do you wish to set them now?" action="Ok" />}
    </div>
  )
}

export default Companies