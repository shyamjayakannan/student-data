"use client";

import React, { useEffect, useState } from 'react'
import Layout from '../../../components/dashboard/layout'
import classes from "../../../styles/dashboard/companies.module.css";
import Card from '../../../components/dashboard/Card';
import data from "./companies.json";
import CardSkeleton from '../../../components/dashboard/CardSkeleton';

const Companies = () => {
  const [loading, setLoading] = useState(true);

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
      {loading ? Array(6).fill(0).map((_, index) => <CardSkeleton key={index} />) : data["2020-21"].map((item, index) => <Card key={index} data={item} />)}
    </div>
  )
}

Companies.getLayout = (page) => <Layout>{page}</Layout>;

export default Companies