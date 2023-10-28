import React from 'react'
import SearchBar from './SearchBar';
import classes from "../../styles/dashboard/companies.module.css";
const Shortlist = () => {
  return (
    <div className={classes.search}><SearchBar/></div>
  )
}

export default Shortlist