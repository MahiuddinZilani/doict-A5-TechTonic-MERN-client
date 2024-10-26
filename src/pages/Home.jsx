import Banner from "../components/Banner";
import Categories from "../components/Categories";
import FAQSection from "../components/FAQSection";
import HighlightsSection from "../components/HighlightsSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TechTonic | Home</title>
      </Helmet>
      <Banner />
      <Categories />
      <HighlightsSection />
      <FAQSection />
    </div>
  );
};

export default Home;
