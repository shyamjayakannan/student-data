"use client";

import React, { useEffect, useState } from 'react'
import classes from "../../styles/dashboard/companies.module.css";
import Card from './Card';
import data from "../../pages/dashboard/companies/companies.json";
import CardSkeleton from './CardSkeleton';
import SearchBar from './SearchBar';

const Companies = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.search}>

      <SearchBar/>
      </div>
      <div className={classes.compcardsbox}>

      {loading ? Array(6).fill(0).map((_, index) => <CardSkeleton key={index} />) : data["2020-21"].map((item, index) => <Card key={index} data={item} />)}
      </div>
    </div>
  )
}

export default Companies