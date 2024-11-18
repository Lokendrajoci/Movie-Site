import Navbar from "/src/components/Navbar/Navbar";
import Welcome from "/src/components/Welcome/Welcome";
import Trending from "./components/Trending/Trending";
import Footer from "./components/Footer/Footer";
import Social from "./components/Social Media/Social";
import "./App.css";

function App() {
  return (
    <>
      <div className="w-full  bg-NavbarWindow">
        <Navbar />
        <Welcome />
        <Trending />
        <Footer />
      </div>
    </>
  );
}

export default App;
