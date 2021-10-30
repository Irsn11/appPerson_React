import React, {useState} from "react";
import axios from "axios";

import './AddPopup.scss';

const AddPopup = ({  onClose, onAdd}) => {
	
 	const [inputNameValue, setInputNameValue] = useState('');
	const [inputLastNameValue, setInputLastNameValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

	const addEmployee = () => {
		if (!inputNameValue) {
			alert('Введите Имя');
			return;
		};
		if (!inputLastNameValue) {
			alert('Введите Фамилию');
			return;
		};
		//переклюаем состояние загрузки
		setIsLoading(true);
    axios.post("http://localhost:3004/persons", {
		firstName: inputNameValue,
		lastName: inputLastNameValue,
		})
			.then(({data}) => {
			onAdd(data);
			onClose();
			})
			.finally(() => {
        setIsLoading(false);
      });
	}

	return (
				<div className="app__popup popup">
				<div className="popup__header">Создание сотрудника</div>
				<div className="popup__body">
					<a onClick={onClose}  className="popup__close">Назад к списку</a>
					<input
					value={inputNameValue}
					onChange= {e=>setInputNameValue(e.target.value) }
					className="popup__field" type="text" placeholder="Введите имя сотрудника" ></input>
					<input
					value={inputLastNameValue}
					onChange= {e=>setInputLastNameValue(e.target.value) }
					className="popup__field" type="text" placeholder="Введите фамилию сотрудника" ></input>
					<button
					onClick={addEmployee}
					className="btn">
					{isLoading ?' Добавление...': 'Сохранить' }
					</button>
				</div>
			</div>
)}

export default AddPopup;