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
	const [loggedfunctionNo, setLoggedfunctionNo] = useState();
  useEffect(() => {
    doGetRequestAut('loggedUser', props.token).then((res)=>{
      setLoggedPersNo(res.data.persNo)
      setLoggedfunctionNo(res.data.functionNo)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
    {(loggedPersNo && loggedfunctionNo) ?
    <div>
      <MySider removeToken={props.removeToken}/>
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner loggedPersNo={loggedPersNo}/>} />
          <Route path="/evaluation" element={<Evaluation token={props.token}/>} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </div> : <div>Loading</div>}
    </div>
  );
}

export default App;
