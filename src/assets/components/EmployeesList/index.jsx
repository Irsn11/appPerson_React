import React, {useState} from "react";


import Employee from '../Employee'
import AddPopup from '../AddPopup'

import './EmployeesList.scss';

const EmployeeList = ({ items, onAdd, onRemove, onClickItem, activeItem, onEdit}) => {

	const [visibleAddPopup, setVisibleAddPopup] = useState(false);

	const onClose = () => {
		setVisibleAddPopup(false);
	}

	return (
	<div className="app__row">
		<div className="app__header header">
			<div className="header__column"></div>
			<div className="header__column">Имя</div>
			<div className="header__column">Фамилия</div>
			<div className="header__column"></div>
		</div>
			<Employee
				items={items}
				activeItem={activeItem}
				onClickItem={onClickItem}
				onRemove={onRemove}
				onEdit={onEdit}
			/>
			<button className="btn"
			onClick={()=>setVisibleAddPopup(true)}
			>Добавить
			</button>


			{visibleAddPopup &&
			<AddPopup
				onAdd={onAdd}
				onClose={onClose}
				/>
			}
	</div>
)}

export default EmployeeList;