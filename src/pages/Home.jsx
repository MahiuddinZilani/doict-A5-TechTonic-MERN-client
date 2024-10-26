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
      <main className="bg-[#F0F2F5] dark:bg-gray-200">
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
