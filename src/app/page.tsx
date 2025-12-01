import EventList from "./components/EventList";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <HeroSection />
      <EventList />
      <Footer />
    </div>
  );
};

export default Home;
