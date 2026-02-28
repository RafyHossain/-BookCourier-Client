import BannerSlider from "../../components/BannerSlider";
import LatestBooks from "../../components/LatestBooks";
import Coverage from "../../components/Coverage";
import WhyChoose from "../../components/WhyChoose";
import HowItWorks from "../../components/HowItWorks";
import Testimonials from "../../components/Testimonials";
import Faq from "../../components/Faq";
import Newsletter from "../../components/Newsletter";

const Home = () => {
  return (
    <div className="bg-slate-50">

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto py-8 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          <span className="text-secondary">Welcome to</span>{" "}
          <span className="text-primary">BookCourier</span>
        </h1>

        <BannerSlider />
      </div>

      
      <LatestBooks />

      <Coverage />

      
      <WhyChoose />

      <HowItWorks />

      
      <Testimonials />
      <Faq></Faq>

      <Newsletter></Newsletter>

    </div>
  );
};

export default Home;
