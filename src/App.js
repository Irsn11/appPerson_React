import React, { useState } from "react";
import EmployeeList from "./assets/components/EmployeesList/index";
import DB from "./assets/db.json";

function App() {
	const [lists, setLists] = useState(DB.lists);
	const onAddEmployee = (obj) => {
		const newList = [...lists, obj];
		setLists(newList);
	};
	return (
		<div className="app">
			<div className="app__body">
				<EmployeeList
					onAdd={onAddEmployee}
					items={
						lists
						/*[{
							avatar: "../../img/avatar.png",
							name: "Имя",
							surname: "фамилия",
						},
						{
							avatar: "",
							name: "Имя1",
							surname: "фамилия1",
						},
					]*/
					}
				/>
			</div>
		</div>
	);
}

export default App;
