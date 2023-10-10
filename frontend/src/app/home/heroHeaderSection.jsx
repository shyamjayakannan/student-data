"use client";
import Image from "next/image";
import classes from "../../styles/home.module.css";
import Link from "next/link";

const data1 = [
  {
    id: 1,
    imageSrc: "/images/image1.png",
    heading: "Companies Find Top Talent with Our Service",
    about:
      "   For Users, our servies starts by anlysing their Linkedin Profiles and providing them witha score based on their qualifications ,skills and experience as of now.",
  },
  {
    id: 2,
    imageSrc: "/images/image3.png",
    heading: "Companies Can Easily Shortlist Candidates",
    about:
      "   For Companies, our service simplifies the hiring process by presenting them with a list of a highly qualified candidates who have been shortlisted based on the dataset.",
  },
  {
    id: 3,
    imageSrc: "/images/company.png",
    heading: " Find the Perfect Internship Opportunity",
    about:
      "  Users can easily search and apply for internship opportunities that match their skills and interests.",
  },
];

export default function HeroHeaderSection() {
  return (
    <div className={classes.home_container}>
      <div className={classes.hero_image}>
        <p className={classes.hero_text}>
          Unlock Your Potential with LinkedIn Scoring
        </p>
        <p className={classes.hero_text2}>
          Discover your opportunities based on your profile
        </p>
        <div className={classes.buttons}>
          <Link href="/auth" className={classes.but1}>
            Get Started
          </Link>
          <Link href="/aboutus" className={classes.but2}>
            Learn More
          </Link>
        </div>
        <Image src="/images/image1.png" width={500} height={350} alt="hero_image" style={{ marginTop: "50px" }} />
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
