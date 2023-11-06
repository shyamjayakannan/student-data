import React from 'react'
import SearchBar from './SearchBar';
import classes from "../../styles/dashboard/companies.module.css";
import Image from 'next/image';
const Shortlist = () => {
  return (
    <div className={classes.main_cont}>
    <div className={classes.search}><SearchBar preset=""/>
  </div>
  <Image src="/images/graph2.png" height={400} width={400} alt="graph2" />
    </div>
  )
}

export default Shortlist