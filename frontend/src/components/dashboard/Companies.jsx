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

const Companies = () => {
  const [loading, setLoading] = useState(false);
  const authenticationCtx = useContext(AuthenticationContext);
  const skillsCtx = useContext(SkillsContext);
  const {popup, setPopup, Component} = usePopup();
  const router = useRouter();

  useEffect(() => {
    if (authenticationCtx.details.id === "") return;

    async function getData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/getAllCompanies`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        if (responseData.type === "Success") {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (authenticationCtx.details.firstTime) setPopup(true);
  }, [authenticationCtx.details.id]);

  useEffect(() => {
    console.log(skillsCtx.skills)
  }, [skillsCtx.skills]);

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <SearchBar />
      </div>
      <div className={classes.compcardsbox}>
        {loading ? Array(6).fill(0).map((_, index) => <CardSkeleton key={index} />) : data["2020-21"].map((item, index) => <Card key={index} data={item} />)}
      </div>
      {popup && <Component function={() => router.push("/dashboard/settings")} title="Skill Preferences" message="Looks like you haven't set skill preferences yet. Do you wish to set them now?" action="Ok" />}
    </div>
  )
}

export default Companies