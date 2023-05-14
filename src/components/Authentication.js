import React, {useState} from "react";
import {Button, Input} from "antd";
import {doPostRequest} from "../helper/RequestHelper";
import {myToastError} from "../helper/ToastHelper";

function Authentication(props) {
	const [txtUsername, setTxtUsername] = useState();
	const [txtPassword, setTxtPassword] = useState();

	function handleLogin() {
		const params = {username: txtUsername, password: txtPassword};
		doPostRequest("token", params).then((response) => {
			props.setToken(response.data.access_token);
			//setIsAdmin(response.data.isAdmin);
		}, error => {
			console.log(error)
			if (error.response.status === 401) {
				myToastError("Benutzername oder Passwort falsch!");
			}
			return error;
		});
		setTxtPassword()
		setTxtUsername()
	}


	return (
		<div>
			<Input value={txtUsername} onChange={(e) => setTxtUsername(e.target.value)} className="ffInputFull" placeholder={"Benutzername"} />
			<Input.Password  value={txtPassword} onChange={(e) => setTxtPassword(e.target.value)} className="ffInputFull" placeholder={"Passwort"} />
			<Button onClick={() => handleLogin()} className="ffInputFull" type="primary">Speichern</Button>
		</div>
	);
}

export default Authentication;