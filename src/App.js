import React, { useState, useEffect } from "react";
import EmployeeList from "./assets/components/EmployeesList/index";
import axios from "axios";
//import DB from "./assets/db.json";

function App() {
	const [persons, setPersons] = useState(null);
	const [activeItem, setActiveItem] = useState(null);

	useEffect(() => {
		axios.get("http://localhost:3004/persons").then(({ data }) => {
			setPersons(data);
		});
	}, []);

	const onAddEmployee = (obj) => {
		const newList = [...persons, obj];
		setPersons(newList);
	};

	const onEditEmployee = (firstName, id, lastName) => {
		console.log("id, firstName, lastName: ", id, firstName, lastName);
		const newList = persons.map((item) => {
			if (item.id === id) {
				item.firstName = firstName;
				item.lastName = lastName;
			}
			return item;
		});
		setPersons(newList);
	};

	return (
		<div className="app">
			<div className="app__body">
				{persons ? (
					<EmployeeList
						onRemove={(id) => {
							const newPersons = persons.filter((item) => item.id !== id);
							setPersons(newPersons);
						}}
						setActiveItem={setActiveItem}
						items={persons}
						onAdd={onAddEmployee}
						onEdit={onEditEmployee}
					/>
				) : (
					"Загрузка..."
				)}
			</div>
		</div>
	);
}

export default App;
