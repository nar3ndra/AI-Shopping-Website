import { useEffect, useRef, useContext } from "react";
import kid from "../Images/tech.png";
import men from "../Images/business.png";
import women from "../Images/sports.png";
import Card from "../components/Card";
import Container from "../components/Container";
import Countdown from "../components/Countdown";
import BannerSection from "../components/BannerSection";
import FeaturedIcon from "../components/FeaturedIcon";
import LandingBanner from "../components/LandingBanner";
import "../styles/landingpage.css";
import { useLocation } from "react-router-dom";
import { LoadingContext } from "./HomeLayout";

const LandingPage = () => {
  const { data, setData } = useContext(LoadingContext);
  const trendingRef = useRef(null);
  const scrollToTop = () => {
    trendingRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollToTop) {
      scrollToTop();
    }
  }, [location.state]);

  return (
    <>
      <LandingBanner />

      <section id="trending" className="title">
        <h1>Which category Are Shopping For?</h1>
      </section>

      <section className="shopping-gender">
        <img src={men} alt="" />
        <img src={women} alt="" />
        <img src={kid} alt="" />
      </section>

      <section id="trending" className="title">
        <h1>Newly Published</h1>
        <h2>Most sold collection and new authours </h2>
      </section>

      <Container />

      {data?.featured && data.featured.length > 0 && (
        <>
          <section id="featuredProd" className="title">
            <h1>Featured Books</h1>
            <h2>Most popular and most bought books around the world</h2>
          </section>

          <section className="Featured-products">
            <div className="product-container">
              {data.featured.map((item) => {
                return <Card key={item._id} {...item} />;
              })}
            </div>
          </section>
        </>
      )}

      <Countdown />
      <div ref={trendingRef} style={{ marginBottom: "15px" }}></div>
      {data?.trending && data.trending.length > 0 && (
        <>
          <section className="title">
            <h1>Hot Deal On Sales</h1>
            <h2>The new books collection</h2>
          </section>
          <section className="Featured-products">
            <div className="product-container">
              {data.trending.map((item) => {
                return <Card key={item._id} {...item} />;
              })}
            </div>
          </section>
        </>
      )}
      <FeaturedIcon />
      <BannerSection />
    </>
  );
};

export default LandingPage;
