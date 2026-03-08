import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { HashRouter  as Router, Routes, Route } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/country/:name" element={<CountryDetails/>}/>
    </Routes>
   </Router>
  );
}

export default App;
