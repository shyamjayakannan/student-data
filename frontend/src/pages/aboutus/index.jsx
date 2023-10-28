"use client";
import Image from "next/image";
import classes from "../../styles/home.module.css";

const data1 = [
  {
    id: 1,
    image: "/images/company.png",
    heading: " Find the Perfect Internship Oppertunity",
    about:
      "  Users can easily search and apply for internship opportunities that match their skills and interests.",
  },
 
  {
    id:3,
    image: "/images/image3.png",
    heading: "Companies Can Easily Shortlist Candidates (Coming Soon)",
    about:
      "   For Companies, our service simplifies the hiring process by presenting them with a list of a highly qualified candidates who have been shortlisted based on the dataset.",
  }, {
    id: 2,
    image: "/images/image1.png",
    heading: "Companies Find Top Talent with Our Service (Coming Soon)",
    about:
      "   For Users, our servies starts by anlysing their Linkedin Profiles and providing them witha score based on their qualifications ,skills and experience as of now.",
  },
  
];

const AboutUs = () => {
  return (
    <>
      <p className={classes.hero_text3}>
        Discover Your Score and Get Shortlisted for Internships
      </p>
      <div className={classes.cards}>
        {data1.map((element) => (
          <div className={classes.card_content} key={element.id}>
            <Image
              src={element.image}
              alt="card_img"
              height={300}
              width={element.image=="/images/image1.png"?400:300}
            />
            <p className={classes.card_text1}>{element.heading}</p>
            <p className={classes.card_text2}>{element.about}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AboutUs;
