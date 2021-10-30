import React, {useState} from "react";
import axios from "axios";

import './EditPopup.scss';

const EditPopup = ({  onClose, onRemove, onEdit, inputNameValue, inputLastNameValue, editId}) => {
	
	const [inputEditNameValue, setInputEditNameValue] = useState(inputNameValue);
	const [editID, setEditID] = useState(editId);
	const [inputEditLastNameValue, setInputEditLastNameValue] = useState(inputLastNameValue);

	const removeEmploee = item => {
		if (window.confirm("Удалить из списка?")) { 
		axios.delete('http://localhost:3004/persons/' + item.id)
			.then(() => {
				onRemove(item.id);
			});
		}
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
				<div className="app__popup popup">
				<div className="popup__header">Редактирование сотрудника</div>
				<div className="popup__body">
				<a onClick={onClose} className="popup__close">Назад к списку</a>
				<input
					value={inputEditNameValue}
					onChange={e => setInputEditNameValue(e.target.value)}
					className="popup__field"
					type="text"
					>
				</input>
				<input
					className="popup__field"
					type="text"
					value={inputEditLastNameValue}
					onChange={e => setInputEditLastNameValue(e.target.value)}
				>
				</input>
				<button className="btn"
					onClick={editEmployee}
				>Сохранить</button>
				</div>
				</div>
		
		
	
	
)}

export default EditPopup;