import React, { useState } from "react";
import classes from "../../styles/dashboard/searchbar.module.css";
import Image from "next/image";
import InputBox from "../chat/InputBox";
const SearchBar = (props) => {
  const [search, setsearch] = useState("");
  const handlesearch = (e) => {
    e.preventDefault();
    console.log(e.target.search.value);
    alert("radhey radhey");
    alert("radhey radhey bol pehle");
  };

  return (
    <form
      method="POST"
      onSubmit={handlesearch}
      className={classes.searchcontainer}
    >
      <InputBox className={classes.searchinput} sendData={props.sendData} />
      {/* <input
        className={classes.searchinput}
        type="text"
        required
        value={search}
        name="search"
        onChange={(e) => {
          setsearch(e.target.value);
        }}
        placeholder="Search your Query"
      /> */}
      <button className={classes.searchbtn} type="submit">
        Search
        <Image
          src="/images/search.png"
          height={20}
          width={20}
          alt="search"
          style={{
            display: "flex",
          }}
        />
      </button>
    </form>
  );
};

export default SearchBar;
