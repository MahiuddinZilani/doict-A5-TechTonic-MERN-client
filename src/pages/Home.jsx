import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TechTonic | Home</title>
      </Helmet>
      <Banner />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
