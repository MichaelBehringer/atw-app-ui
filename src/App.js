import {Route, Routes} from "react-router-dom";
import Planner from "./components/Planner";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import MySider from "./components/MySider";
import Home from "./components/Home";
import Evaluation from "./components/Evaluation";
import Search from "./components/Search";

function App() {
  return (
    <div>
      <MySider />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>


    </div>
  );
}

export default App;
