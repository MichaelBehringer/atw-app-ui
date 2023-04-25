import {useNavigate} from "react-router-dom";

function Hub() {
	const navigate = useNavigate();

	function handlePlanner() {
		console.log('hello')
		navigate("/planner");
	}

	function handleParts() {
		navigate("/parts");
	}

	function handleCam() {
		navigate("/cam");
	}

	return (
		<div>
			<button className="ffButton" onClick={()=>handlePlanner()}>Zeiterfassung</button>
			<button className="ffButton" onClick={()=>handleParts()}>Ersatzteile</button>
			<button className="ffButton" onClick={()=>handleCam()}>Kamera</button>
		</div>
	);
}

export default Hub;
