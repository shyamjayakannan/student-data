"use client";
import Image from "next/image";
import image1 from "../../assests/image1.png";
import classes from "../../styles/home.module.css";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import AuthenticationContext from "../../store/AuthenticationContext";
import comp from "../../assests/company.png";
import image3 from "../../assests/image3.png";
import Link from "next/link";
export default function HeroHeaderSection() {
  const router = useRouter();
  const authenticationCtx = useContext(AuthenticationContext);
  const { removePersonalDetails } = useLocalStorage();
  function logout() {
    authenticationCtx.setLoggedIn(false);
    removePersonalDetails();
  }
  const data1 = [
    {
      id: 1,
      image: comp,
      heading: "Companies Find Top Talent with Our Service",
      about:
        "   For Users, our servies starts by anlysing their Linkedin Profiles and providing them witha score based on their qualifications ,skills and experience as of now.",
    },
    {
      id: 2,
      image: image3,
      heading: "Companies Can Easily Shortlist Candidates",
      about:
        "   For Companies, our service simplifies the hiring process by presenting them with a list of a highly qualified candidates who have been shortlisted based on the dataset.",
    },
    {
      id: 3,
      image: comp,
      heading: " Find the Perfect Internship Oppertunity",
      about:
        "  Users can easily search and apply for internship opportunities that match their skills and interests.",
    },
  ];

  const handleSignup = (e) => {
    e.preventDefault();
    router.push("/auth");
  };
  return (
    <div className={classes.home_container}>
      <div className={classes.hero_iamge}>
        <p className={classes.hero_text}>
          Unlock Your Potential with LinkedIn Scoring
        </p>
        <p className={classes.hero_text2}>
          Discover your opportunities based on your profile
        </p>
        <div className={classes.buttons}>
          <Link href={"/auth"} className={classes.but1} onClick={handleSignup}>
            Get Started
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push(`/aboutus`);
            }}
            className={classes.but2}
          >
            Learn More
          </button>
        </div>
        <Image src={image1} alt="hero_image" className={classes.image1} />
      </div>

      {/* <p className={classes.hero_text3}>
        Discover Your Score and Get Shortlisted for Internships
      </p> */}
      {/* <div className={classes.cards}>
        {data1.map((element) => (
          <div className={classes.card_content} key={element.id}>
            <Image src={element.image} alt="card_img" className={classes.imags} />
            <p className={classes.card_text1}>
              {element.heading}
            </p>
            <p className={classes.card_text2}>
              {element.about}
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
}
