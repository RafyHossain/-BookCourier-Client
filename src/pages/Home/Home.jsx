import BannerSlider from "../../components/BannerSlider";
import LatestBooks from "../../components/LatestBooks";
import Coverage from "../../components/Coverage";
import WhyChoose from "../../components/WhyChoose";
import HowItWorks from "../../components/HowItWorks";
import Testimonials from "../../components/Testimonials";

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

      {/* Latest Books */}
      <LatestBooks />

      {/* Coverage Map */}
      <Coverage />

      {/* Why Choose */}
      <WhyChoose />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

    </div>
  );
};

export default Home;
