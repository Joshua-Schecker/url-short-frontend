import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { auth, firestore } from "./firebaseConfig"; // imported here to initialize before use

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

reportWebVitals();
