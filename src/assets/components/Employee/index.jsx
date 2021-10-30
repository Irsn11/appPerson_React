import React, {useState} from "react";
import axios from "axios";
import classNames from "classnames";

import EditPopup from '../EditPopup'

import avatar from '../../img/avatar.png';
import closeIcon from '../../img/close.svg';
import editIcon from '../../img/edit.svg';

import './Employee.scss';

const Employee = ({ items, onRemove, onClickItem, activeItem, onEdit}) => {
	
	const [visibleEditPopup, setVisibleEditPopup] = useState(false);
	const [inputEditNameValue, setInputEditNameValue] = useState('');
	const [editID, setEditID] = useState('');
	const [inputEditLastNameValue, setInputEditLastNameValue] = useState('');

	const onClose = () => {
			setVisibleEditPopup(false);
	}

	const removeEmploee = item => {
		if (window.confirm("Удалить из списка?")) { 
		axios.delete('http://localhost:3004/persons/' + item.id)
			.then(() => {
				onRemove(item.id);
			});
		}
	}

	const showEditEmployeeForm = () => {
		setVisibleEditPopup(true);
	}
	
const editEmployee = () => {
		onEdit(inputEditNameValue, editID, inputEditLastNameValue)
		axios.patch("http://localhost:3004/persons/" + editID, {
			firstName: inputEditNameValue,
			lastName:inputEditLastNameValue
		}).catch(() => {
			alert('Не удалось обновить!')
		});
		onClose();
	}

	return (
	<div className="app__list list">	{
		items.map((item, index) =>
			<div
				key={index}
				className={classNames(item.className,'list__item','item',{
				active: item.active
				? item.active
				: activeItem && activeItem.id === item.id
				})}
		  	onClick={onClickItem ? () => onClickItem(item) : null}
			>
			<div className="item__column"><img src={avatar} alt="lost icon" /></div>
			<div className="item__column">{item.firstName}</div> 
			<div className="item__column">{item.lastName}</div>
			<div className="item__column item__buttons">
			<div
				className="item__edit"
				onClick={() => {
				setInputEditNameValue(item.firstName);
				setInputEditLastNameValue(item.lastName);
				setEditID(item.id)
				showEditEmployeeForm()
				}
			}>
				<img
					src={editIcon} alt="edit icon" />
				</div>
				<div className="item__delete ">
					<img
						onClick={()=>removeEmploee(item)}
						src={closeIcon}
						alt="close icon"
					/>
				</div>
			</div>
			</div>
			)}
			{visibleEditPopup && 	<EditPopup
				inputEditNameValue={inputEditNameValue}
				onClose={onClose}
				onEdit={onEdit}
				inputNameValue={inputEditNameValue}
				inputLastNameValue={inputEditLastNameValue}
				editId={editID}
			/>
			}
			</div>
)}

export default Employee;