import image from "../Images/MAIN-SECTION.svg";

const LandingBanner = () => {
  return (
    <section className="main-Container">
      <p className="p1">THE UB </p>
      <p className="p2">BOOK STORE</p>
      <div className="main-img-cont">
        <img className="main-img" src={image} alt="First slide" />
        <p className="p3">
          <span>READING</span>
          <span> ENRICHES</span>
        </p>
      </div>
      <p className="p4">UNWRAP POSSIBILITIES</p>
    </section>
  );
};

export default LandingBanner;
