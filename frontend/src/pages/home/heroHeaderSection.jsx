"use client";
import Image from "next/image";
import classes from "../../styles/home.module.css";
import Link from "next/link";


export default function HeroHeaderSection() {
  return (
    <div className={classes.home_container}>
      <div className={classes.hero_image}>
        <p className={classes.hero_text}>
          Unlock Your Path to the dream Company 
        </p>
        <p className={classes.hero_text2}>
          Discover your opportunities based on your profile
        </p>
        <div className={classes.buttons}>
          <Link href="/dashboard" className={classes.but1}>
            Get Started
          </Link>
          <Link href="/aboutus" className={classes.but2}>
            Learn More
          </Link>
        </div>
        <Image src="/images/image1.png" priority width={500} height={350} alt="hero_image" style={{ marginTop: "50px" }} />
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
