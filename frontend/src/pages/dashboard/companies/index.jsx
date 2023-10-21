"use client";

import React, { useEffect } from 'react'
import Layout from '../../../components/dashboard/layout'
import classes from "../../../styles/dashboard/companies.module.css";
import Card from '../../../components/dashboard/Card';
import data from "./companies.json";

const Companies = () => {
  return (
    <div className={classes.container}>
      {data["2020-21"].map((item, index) => <Card key={index} data={item} />)}
    </div>
  )
}

Companies.getLayout = (page) => <Layout>{page}</Layout>;

export default Companies