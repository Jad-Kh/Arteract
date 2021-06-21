import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <div className="sideContainer">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
