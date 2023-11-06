import classes from "../../styles/dashboard/searchbar.module.css";
import Image from "next/image";
import InputBox from "../chat/InputBox";

const SearchBar = (props) => {
  return (
    <form
      method="POST"
      className={classes.searchcontainer}
    >
      <InputBox className={classes.searchinput} preset={props.preset} noclear sendData={props.sendData} />
      {/* <button className={classes.searchbtn} type="submit">
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
      </button> */}
    </form>
  );
};

export default SearchBar;
