import React from "react";
import SearchBar from "./SearchBar";
import classes from "../../styles/dashboard/companies.module.css";
import Image from "next/image";
const Students = () => {
  return (
    <div className={classes.main_cont}>
      <div className={classes.search}>
        <SearchBar preset="" />
      </div>
      <Image src="/images/graph1.png" height={400} width={400} alt="graph1" />
      {/* <h2>Students</h2> */}
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Action</th>
            </tr>
            </thead>
            <tbody>
            </tbody>

      </table> */}

    </div>
  );
};

export default Students;
