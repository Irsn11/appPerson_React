import React, {useState, useEffect} from "react";
import axios from "axios";
//import avatar from "../img/avatar.png";
import './EmployeesList.scss';
import avatar from '../../img/avatar.png';
import closeIcon from '../../img/close.svg';
import editIcon from '../../img/edit.svg';
const EmployeeList = ({ items, onAdd,onRemove}) => {
	

	const [visibleAddPopup, setVisibleAddPopup] = useState(false);
	const [visibleEditPopup, setVisibleEditPopup] = useState(false);
	const [inputNameValue, setInputNameValue] = useState('');
	const [inputsurnameValue, setInputsurnameValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

	const onClose = () => {
	  setInputNameValue ('');
		setInputsurnameValue('');
		setVisibleEditPopup(false);
		setVisibleAddPopup(false);
}
	const removeEmploee = item => {
		if (window.confirm("Удалить из списка?")) { 
		axios.delete('http://localhost:3004/lists/' + item.id)
			.then(() => {
				onRemove(item.id);
			
			});
	}
		
}
	const addEmployee = () => {
		if (!inputNameValue) {
			alert('Введите Имя');
			return;
		};
		if (!inputsurnameValue) {
			alert('Введите Фамилию');
			return;
		};

		//переклюаем состояние загрузки
		setIsLoading(true);
    axios.post("http://localhost:3004/lists", {
		name: inputNameValue,
		surname: inputsurnameValue,
		})
			.then(({ data }) => {
			onAdd(data);
				onClose();
				
		})
       .finally(() => {
        setIsLoading(false);
      });
		
	}
	
	 return (
		 <div className="app__row">
			 <div className="app__item header">
					 <div className="app__item-column"></div>
					 <div className="app__item-column">Имя</div>
					 <div className="app__item-column">Фамилия</div>
			 </div>
			<div className="app__main">	{
				 items.map((item, index) =>
					 <div key={index} className="app__item">
						 <div className="app__item-column"><img src={avatar} alt="lost icon" /></div>
 						<div className="app__item-column">{item.name}</div> 
						 <div className="app__item-column">{item.surname}
							 <div className="app__item-buttons">
								 <div className="app__item-edit"
								  onClick={()=>setVisibleEditPopup(true)}
								 ><img src={editIcon} alt="edit icon" /> </div>
								 <div className="app__item-delete ">
									 <img
										 onClick={()=>removeEmploee(item)}
										 src={closeIcon}
										 alt="close icon"
									 />
								 </div>
							 </div>
					 </div>
					</div>
			 )}</div>
			 <button className="btn"
			 onClick={()=>setVisibleAddPopup(true)}
			 >
				 {isLoading ?' Добавление...': 'Добавить' }
				
			 </button>
			 {visibleAddPopup &&
				 <div className="app__popup popup">
					 <div className="popup__header">Создание сотрудника</div>
					 <div className="popup__body">
					 <a onClick={onClose}  className="popup__close">Назад к списку</a>
					 <input
						 value={inputNameValue}
						 onChange= {e=>setInputNameValue(e.target.value) }
						 className="popup__field" type="text" placeholder="Введите имя сотрудника" ></input>
					 <input
						  value={inputsurnameValue}
						 onChange= {e=>setInputsurnameValue(e.target.value) }
						 className="popup__field" type="text" placeholder="Введите фамилию сотрудника" ></input>
					 <button
						 onClick={addEmployee}
						 className="btn">Сохранить</button>
					 </div>
				 
				 </div>
			 }
			 	 {visibleEditPopup &&
				 <div className="app__popup popup">
					 <div className="popup__header">Редактирование сотрудника</div>
					 <div className="popup__body">
					 <a onClick={onClose} className="popup__close">Назад к списку</a>
						 <input className="popup__field" type="text"></input>
						 <input className="popup__field" type="text"></input>
						 <button className="btn">Сохранить</button>
					 </div>
				 
				 </div>
			 }
		 </div>
		

)}

export default EmployeeList;
