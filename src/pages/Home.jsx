import Banner from "../components/Banner";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TechTonic | Home</title>
      </Helmet>
      <Banner />
      <Footer />
    </div>
  );
};

export default Home;
