import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

function App() {
	const [url, setUrl] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [response, setResponse] = useState("");
	const [token, setToken] = useState("");
	const handleChange = (event: any) => {
		setUrl(event.target.value);
	};
	const onClick = async (e: any) => {
		e.preventDefault();
		const token = await auth.currentUser.getIdToken();
		console.log(token);
		const response = await axios.post(
			"http://localhost:3000/api/v1/shorten",
			{
				url,
			},
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		setResponse(response.data.id);
	};
	const register = async () => {
		await createUserWithEmailAndPassword(auth, userName, password);
		signInWithEmailAndPassword(auth, userName, password);
		// setToken(auth.currentUser?.getIdToken() || "");
	};
	const login = async () => {
		const result = await signInWithEmailAndPassword(auth, userName, password);
	};
	return (
		<div>
			<form>
				<input name="url" type="text" value={url} onChange={handleChange} />
				<button type="button" onClick={onClick}>
					Submit
				</button>
			</form>
			<a href={`http://localhost:3001/${response}`}>
				{`http://localhost:3001/${response}`}
			</a>
			<form>
				<input
					name="userName"
					type="text"
					value={userName}
					onChange={(event: any) => {
						setUserName(event.target.value);
					}}
				/>
				<input
					name="password"
					type="text"
					value={password}
					onChange={(event: any) => {
						setPassword(event.target.value);
					}}
				/>
				<button type="button" onClick={login}>
					Log in
				</button>
				<button type="button" onClick={register}>
					Register
				</button>
			</form>
		</div>
	);
}

export default App;
