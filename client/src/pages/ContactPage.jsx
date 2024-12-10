import Header from "../components/Header";
import { FaRegMap, FaPhoneAlt, FaClock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  const combinedText = {
    text1: "#lets's_talk",
    text2: "Leave A Message, We love to hear from you!",
    url: "https://i.imgur.com/f6bqTfa.jpg",
  };
  return (
    <>
      <div>
        <Header combinedText={combinedText} />
      </div>
      <div className="contact-details">
        <div className="company-details">
          <span>GET IN TOUCH</span>
          <h2>Visit us in our university</h2>
          <h3>Students Location</h3>
          <div className="contactAddress">
            <ul type="none">
              <li>
                <div>
                  <FaRegMap />
                </div>{" "}
                University of Bridgeport, Bridgeport, CT, USA 06604
              </li>
              <li>
                <div>
                  <FiMail />
                </div>{" "}
                nmeenuga@my.bridgeport.edu
              </li>
              <li>
                <div>
                  <FaPhoneAlt />
                </div>{" "}
                +1 4753325025
              </li>
              
            </ul>
          </div>
        </div>
        <div className="map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3003.612362631191!2d-73.19323378923718!3d41.1648091096536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e80e0e8cba1c71%3A0x9c3bc31028d06477!2sUniversity%20of%20Bridgeport!5e0!3m2!1sen!2sus!4v1733802750059!5m2!1sen!2sus"
            height="450"
            style={{ border: "0", width: "-webkit-fill-available" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <ContactForm />
    </>
  );
};

export default ContactPage;
