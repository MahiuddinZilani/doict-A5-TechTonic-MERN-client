import {
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../assets/techTonic_croped-removebg.png";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="py-6 bg-gray-800 dark:bg-[#0A1F44] text-gray-50 dark:text-gray-200">
        <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 dark:divide-gray-600 md:space-y-12 divide-opacity-50">
          <div className="grid grid-cols-12 space-y-8">
            <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
              <a
                href="/"
                className="flex justify-center space-x-3 md:justify-start"
              >
                <div className="flex items-center justify-center w-20 h-20">
                  <img src={logo} alt="Tech Tonic Logo" />
                </div>
                <span className="self-center text-2xl font-semibold">
                  Tech Tonic
                </span>
              </a>
            </div>

            <div className="col-span-full text-center md:text-left md:col-span-3">
              <p className="pb-1 text-lg font-medium">Contact Us</p>
              <ul>
                <li>
                  Email:{" "}
                  <a href="mailto:support@techtonic.com">
                    support@techtonic.com
                  </a>
                </li>
                <li>
                  Phone: <a href="tel:+1234567890">+1 (234) 567-890</a>
                </li>
              </ul>
            </div>

            <div className="col-span-full text-center md:text-left md:col-span-3">
              <p className="pb-1 text-lg font-medium">Follow Us</p>
              <div className="flex justify-center space-x-4 mt-2 text-2xl">
                <Link to={"/"}>
                  <FaFacebook />
                </Link>
                <Link to={"/"}>
                  <FaX />
                </Link>
                <Link to={"/"}>
                  <FaLinkedin />
                </Link>
                <Link to={"/"}>
                  <FaYoutube />
                </Link>
                <Link to={"/"}>
                  <FaTelegram />
                </Link>
                <Link to={"/"}>
                  <FaWhatsapp />
                </Link>
                {/* Repeat the above link structure for each social media platform */}
              </div>
            </div>
          </div>

          <div className="grid justify-center pt-6 lg:justify-between">
            <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
              <span>©2024 All rights reserved</span>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span>Privacy policy</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span>Terms of service</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
