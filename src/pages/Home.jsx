import Banner from "../components/Banner";
import Categories from "../components/Categories";
import HighlightsSection from "../components/HighlightsSection";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TechTonic | Home</title>
      </Helmet>
      <Banner />
      {/* <main className="bg-[#F0F2F5] dark:bg-gray-200">
        <Categories />
        <HighlightsSection />
      </main> */}

      <Categories />
      <HighlightsSection />

      <Footer />
    </div>
  );
};

export default Home;
