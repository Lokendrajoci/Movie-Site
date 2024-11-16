import Navbar from "/src/components/Navbar/Navbar";
import Welcome from "/src/components/Welcome/Welcome";
import Trending from './components/Trending/Trending'
import "./App.css";

function App() {
  return (
    <>
      <div className="w-full  bg-NavbarWindow">
        <Navbar />
        <Welcome />
        <Trending/>
      </div>
    </>
  );
}

export default App;
