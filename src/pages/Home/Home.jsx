import BannerSlider from "../../components/BannerSlider";

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto py-5 px-6">
           

            <h1 className="text-5xl font-bold text-center mb-5">
               <span className="text-secondary"> Welcome to</span> <span className="text-primary">BookCourier</span>
            </h1>

            <BannerSlider></BannerSlider>


        </div>
    );
};

export default Home;
