import {Route, Routes} from "react-router-dom";
import Planner from "./Planner";
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect, useState} from 'react';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import MySider from "./MySider";
import Home from "./Home";
import Evaluation from "./Evaluation";
import Search from "./Search";
import {doGetRequestAut} from "../helper/RequestHelper";

function App(props) {
	const [loggedPersNo, setLoggedPersNo] = useState();
	const [loggedFunctionNo, setLoggedFunctionNo] = useState();
  useEffect(() => {
    doGetRequestAut('loggedUser', props.token).then((res)=>{
      setLoggedPersNo(res.data.persNo)
      setLoggedFunctionNo(res.data.functionNo)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
    {(loggedPersNo && loggedFunctionNo) ?
    <div>
      <MySider loggedFunctionNo={loggedFunctionNo} removeToken={props.removeToken}/>
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner loggedPersNo={loggedPersNo}/>} />
          <Route path="/evaluation" element={<Evaluation loggedFunctionNo={loggedFunctionNo}/>} />
          <Route path="/search" element={<Search loggedFunctionNo={loggedFunctionNo} loggedPersNo={loggedPersNo}/>} />
        </Routes>
      </div>
    </div> : <div>Daten werden geladen</div>}
    </div>
  );
}

export default App;
