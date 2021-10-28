import React, {useState, useEffect} from "react";
import axios from "axios";
import classNames from "classnames";
//import avatar from "../img/avatar.png";
import './EmployeesList.scss';
import avatar from '../../img/avatar.png';
import closeIcon from '../../img/close.svg';
import editIcon from '../../img/edit.svg';


const EmployeeList = ({ items, onAdd,  onRemove, activeItem, onEdit}) => {
	
	const [visibleAddPopup, setVisibleAddPopup] = useState(false);
	const [visibleEditPopup, setVisibleEditPopup] = useState(false);
	const [inputNameValue, setInputNameValue] = useState('');
	const [inputLastNameValue, setInputLastNameValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
	const [inputEditNameValue, setInputEditNameValue] = useState('');
	const [editID, setEditID] = useState('');
	const [inputEditLastNameValue, setInputEditLastNameValue] = useState('');

	const onClose = () => {
	  setInputNameValue ('');
		setInputLastNameValue('');
		setVisibleEditPopup(false);
		setVisibleAddPopup(false);
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
			.then(({ data }) => {
			onAdd(data);
				onClose();
				
		})
       .finally(() => {
        setIsLoading(false);
      });
		
	}

	const editEmployee = () => {
		onEdit(inputEditNameValue, editID, inputEditLastNameValue)
		axios.patch("http://localhost:3004/persons/" + editID, {
			firstName: inputEditNameValue,
			lastName:inputEditLastNameValue
		});
		onClose();

	}

	 return (
		 <div className="app__row">
			 <div className="app__item header">
					 <div className="app__item-column"></div>
					 <div className="app__item-column">Имя</div>
				 <div className="app__item-column">Фамилия</div>
				 <div className="app__item-column"></div>
			 </div>
			 <div className="app__main">	{
				 items.map((item, index) =>
					 <div
						 className={classNames(item.className,'app__item ',{
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id
          })}
						 onClick={() => {
							 setInputEditNameValue(item.firstName);
							 setInputEditLastNameValue(item.lastName);
							 setEditID(item.id)
						 }}
						 key={index}
						 
						>
						 <div className="app__item-column"><img src={avatar} alt="lost icon" /></div>
 						<div className="app__item-column">{item.firstName}</div> 
						<div className="app__item-column">{item.lastName}

					 </div>
					 		<div className="app__item-buttons">
								 <div className="app__item-edit"
								  onClick={showEditEmployeeForm}>
								 <img
									 src={editIcon} alt="edit icon" /> </div>
								 <div className="app__item-delete ">
									 <img
										 onClick={()=>removeEmploee(item)}
										 src={closeIcon}
										 alt="close icon"
									 />
								 </div>
							 </div>
					</div>
				 )}
			 </div>
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
			 }
			 	 {visibleEditPopup &&
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
						 //onClick={() => onEdit(activeItem.firstName, activeItem.lastName, activeItem.id)}
					 >Сохранить</button>
					 </div>
				 
				 </div>
			 }
		 </div>
		

)}

export default EmployeeList;
