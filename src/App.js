import {Route, Routes} from "react-router-dom";
import Planner from "./components/Planner";
import React from 'react';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import MySider from "./components/MySider";
import Home from "./components/Home";
import Evaluation from "./components/Evaluation";

function App() {
  return (
    <div>
           <MySider />
            <div className="mainContent">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/evaluation" element={<Evaluation />} />
                </Routes>
            </div>

    
    </div>
  );
}

export default App;
