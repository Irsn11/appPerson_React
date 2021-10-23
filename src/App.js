import React from "react";
import EmployeeList from "./assets/components/EmployeesList/index";
// import './App.css';

function App() {
	return (
		<div className="app">
			<div className="app__body">
				<EmployeeList
					items={[
						{
							avatar: "../../img/avatar.png",
							name: "Имя",
							surename: "фамилия",
						},
						{
							avatar: "",
							name: "Имя1",
							surename: "фамилия1",
						},
					]}
				/>
			</div>
		</div>
	);
}

export default App;
