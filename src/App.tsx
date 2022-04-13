import { memo } from "react";
import "./App.css";
import UserForm from "./components/userForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/dashboard";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Dashboard />}></Route>
						<Route
							path={"new-user"}
							element={<UserForm isEditMode={false} />}
						></Route>
						<Route
							path={"edit-user"}
							element={<UserForm isEditMode={true} />}
						></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default memo(App);
