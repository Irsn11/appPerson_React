import React, { useState, useEffect } from "react";
import EmployeeList from "./assets/components/EmployeesList/index";
import axios from "axios";
//import DB from "./assets/db.json";

function App() {
	const [lists, setLists] = useState(null);

	useEffect(() => {
		axios.get("http://localhost:3004/lists").then(({ data }) => {
			setLists(data);
		});
	}, []);

	const onAddEmployee = (obj) => {
		const newList = [...lists, obj];
		setLists(newList);
	};
	return (
		<div className="app">
			<div className="app__body">
				{lists ? (
					<EmployeeList
						onRemove={(item) => console.log(item)}
						onAdd={onAddEmployee}
						items={lists}
					/>
				) : (
					"Загрузка..."
				)}
			</div>
		</div>
	);
}

export default App;
