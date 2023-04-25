import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Hub from "./components/Hub";
import Planner from "./components/Planner";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </div>
  );
}

export default App;
